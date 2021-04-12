import Header from './Header'
import Slide from './Slide'
import {useState} from 'react'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

const Carrousel = ({carrouselData})=>{
   var [currentSlide, setCurrent] = useState(0);
   const length = carrouselData.length

   const nextSlide = ()=>{
      setCurrent(currentSlide === length - 1 ? 0 : currentSlide +1)
   }
   const previousSlide = ()=>{
      setCurrent(currentSlide === 0 ? length-1 : currentSlide -1 )
   }
   const automaticReproduction = ()=>{
      setTimeout(function(){
         setCurrent(currentSlide === length - 1 ? 0 : currentSlide +1,)
      }, 3000)}
   function limpiar (){
      window.clearTimeout(automaticReproduction)
   }
   return (
      <>
         {/* {automaticReproduction()} */}
         <div className="slide-tittle-container">
            <h3 className="slide-tittle">Popular MyTinerarys</h3>
         </div>
         <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={previousSlide, limpiar()} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>

            {carrouselData.map((singleSlide, index)=>{
               return(
                  <div className={index === currentSlide ? 'slide active': 'slide'} key={index}>
                     {index === currentSlide  && (
                        <Slide singleSlide={singleSlide} currentSlide={currentSlide}  /> 
                      )}
                  </div>
                  )
            })}
         </section>
      </>
   )
}
export default Carrousel