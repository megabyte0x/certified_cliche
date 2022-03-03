import React from 'react'

const EventCard = ({eventImage, eventName, eventDesciption, key}) => {
  return (
    <div key={key}>
        <div className=" w-[435px] h-[255px] rounded-3xl relative  z-50">
        <img
          src={eventImage}
          alt={eventName}
          className="rounded-3xl object-cover w-[435px] h-[255px] absolute"
          />
          {/* This is for the shadow on the Image */}
        <div className=" relative z-20 bg-gradient-to-t from-black to-white w-[435px] h-[255px] opacity-50 rounded-3xl"></div> 
        {/* Text part in the Image */}
        <div className=' absolute bottom-7 left-10 text-white z-30'>
          <p className="text-2xl font-semibold">{eventName} </p>
          <p className="text-sm mt-1 ">
            {eventDesciption}.{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventCard