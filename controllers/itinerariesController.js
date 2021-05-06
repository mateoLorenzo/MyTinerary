const Itinerary = require('../models/Itinerary')

const itinerariesController = {
   getAllItineraries: async (req, res) =>{
      try {
         var allCities = await Itinerary.find()
      } catch(err){
         console.log('Cai en el catch y el error es: ' + err)
      }
      res.json({respuesta: allCities})
   },
 
   addNewItinerary: async (req, res) =>{
      try{
         const {tittle, authorName, authorImg, price, duration, likes, idCity, hashtags } = req.body
         const itineraryToSave = new Itinerary({tittle, authorName, authorImg,price, duration, likes, idCity, hashtags,}) //Creo una nueva instancia de mi modelo City 
         await itineraryToSave.save() //como es una instancia de un modelo, me habilita los metodos que puede realizar un modelo. 
         var allItineraries = await Itinerary.find()
      } catch (err){
         console.log('Cai en el catch y el error es: ' + err)
      }
      res.json({respuesta: allItineraries })
   },

   getSingleCityItineraries: async (req, res) =>{
      try{
         const id = req.params.id
         var itinerariesAsked = await Itinerary.find({idCity: id})
      }catch(err){
         console.log('Cai en el catch y el error es: '+ err)
      }
      res.json({respuesta: itinerariesAsked})
   },

   getSingleItinerary: async (req, res) =>{
      try {
         const id = req.params.id
         var itinerarySelected = await Itinerary.findOne({_id: id})
      } catch (err){
         console.log('Caí en el catch y el error es: '+ err)
      }
      res.json({respuesta: itinerarySelected})
   },

   editItinerary: async (req, res) =>{
      try {
         const id = req.params.id
         var modifiedItinerary = await Itinerary.findOneAndUpdate({_id:id},{...req.body}, {new: true}) // el new true va xq sino no me devuelve el objeto modif.
      } catch (err){
         console.log('Caí en el catch y el error es: ' + err)
      }
      res.json({respuesta: modifiedItinerary})
   },

   deleteItinerary: async (req, res) =>{
      try {
         const id = req.params.id
         await Itinerary.findOneAndDelete({_id: id})
         var allItineraries = await Itinerary.find()
      } catch (err){
         console.log('Caí en el catch y el erro es: '+ err)
      }
      res.json({respuesta: allItineraries})
   },

   likeItinerary: async(req, res)=>{
      try {
         const {userId, itineraryId} = req.body
         
         var itineraryLiked = await Itinerary.findOne({_id: itineraryId})
         var liked;

         if(itineraryLiked.likes.indexOf(userId) === -1){
            itineraryLiked = await Itinerary.findOneAndUpdate({_id: itineraryId},{$push: {likes: userId}}, {new: true})
            liked = true //si liked es true, está en el array
         } else {
            itineraryLiked = await Itinerary.findOneAndUpdate({_id: itineraryId},{$pull: {likes: userId}}, {new: true})
            liked = false //si liked es false, no está en el array
         }
         
         console.log(itineraryLiked.likes)
         console.log(itineraryLiked.likes.length)
      } catch(err){
         console.log('Cai en el catch y el error es: ' + err)      
      }
      res.json({itineraryLikes: itineraryLiked.likes.length, liked: liked})
   } 
}

module.exports = itinerariesController