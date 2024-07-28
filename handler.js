const { Loader, Function: Func, Scraper } = new(require('./lib'))
const { collection } = require('./lib/system/config')
const express = require('express')
const router = express.Router()

const createRouter = async () => {
   try {
      await Loader.router('./routers')
      const routers = Object.values(Object.fromEntries(Object.entries(Loader.plugins)))
      routers.map(v => {
         const route = v.routes
         if (route.name) collection.push({
            base_code: Buffer.from(route.category.toLowerCase()).toString('base64'),
            name: route.name,
            path: route.example ? `${route.path}?${new URLSearchParams(route.example).toString('utf-8')}${route.premium ? '&apikey=' + ('Y') : ''}` : '',
            method: route.method.toUpperCase(),
            error: route.error
         })
   
         route.utils = Object.freeze({
            Func
         })
         
         // error
         const error = (route.error ? (req, res, next) => {
            res.json({
               creator: global.creator,
               status: false,
               msg: `Sorry, this feature is currently error and will be fixed soon`
            })
         } : (req, res, next) => {
            next()
         })

         // custom validator
         const validator = (route.validator ? route.validator: (req, res, next) => {
            next()
         })
         
         // compile router
         router[route.method](route.path, validator, route.execution)
         if (router.stack.length === routers.length) return
      })
      
      return router
   } catch (e) {
      console.log(e)
   }
}

module.exports = createRouter()