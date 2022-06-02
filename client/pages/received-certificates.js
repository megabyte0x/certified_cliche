import flutter from "../public/flutter-logo.svg";
import arVr from "../public/AR-VR.svg";
import woman from "../public/woman.svg";
import amazon from "../public/amazon.svg";
import puppy from "../public/puppy.svg";
import metaverse from "../public/metaverse.svg";
import NFTCard from "./components/NFTCard/NFTCard";
import "../styles/received-certificates.module.css";

const ReceivedCertificates = () => {
  const certificateData = [
    {
      id: 1,
      img: flutter.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 2,
      img: arVr.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 3,
      img: woman.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 4,
      img: amazon.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 5,
      img: puppy.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 6,
      img: amazon.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 7,
      img: flutter.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
    {
      id: 8,
      img: metaverse.src,
      heading: "Flutter logo",
      para: "this is a flutter logo",
    },
  ];
  return (
  <div className="m-4 md:m-6 lg:m-8">
      <h3 className="md:text-[1.3rem] text-[1.2rem] font-semibold ml-3 md:ml-5 lg:ml-7">
        Received Certificates
      </h3>
      <div className="flex justify-center items-center">
        <div className="w-[95%]  bg-[#bbbaba] h-[1px] mb-10 mt-3 "></div>
      </div>
      <div className="flex justify-center">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 pt-4">
            {certificateData.map((certificate, i) => {
              return (
                <NFTCard
                  key={i}
                  nftImage={certificate.img}
                  nftName={certificate.name}
                  nftDesciption={certificate.para}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedCertificates;

/*To remove
<div className="m-4 md:m-6 lg:m-8">
      <h3 className="md:text-[1.3rem] text-[1.2rem] font-semibold ml-3 md:ml-5 lg:ml-7">
        My Certificates
      </h3>
      
      <div className="flex justify-center items-center">
        <div className="w-[95%]  bg-[#bbbaba] h-[1px] mb-10 mt-3 "></div>
      </div>
      <div className="flex flex-wrap items-center md:justify-start justify-center">
        {certificateData.map((item) => {
          const { id } = item;
          //console.log('item: ', item.id)
          //console.log('id:', id)
          return (
          <div>
          {/<div key={id} className = "received-certificates">
          <HomeCard {...item} /> 

            <NFTCard 
                  id = {item.id}
                  nftImage = {item.img}
                  nftName = {item.heading}
                  nftDesciption = {item.para}
          /> /}
          </div>
          );
        })}
      </div>
      {/<div className="flex justify-center items-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 gap-4 justify-center" >/}

      <div >
        <div>
          <div className = "grid lg:grid-cols-3 px-4 gap-4" 
            style = {{paddingLeft: '0px'}}>
              {certificateData.map((item) => {
                const { id } = item;
                console.log('item: ', item.id)
                console.log('id:', id)
                  return (
                  <div>
                    {*<div key={id} className = "received-certificates">
                    <HomeCard {...item} />*}

                      <NFTCard 
                            id = {item.id}
                            nftImage = {item.img}
                            nftName = {item.heading}
                            nftDesciption = {item.para}
                        /> 
                  </div>
                  );
                }  
                )
              }
          </div>
        </div>
          </div> 
    </div> 
*/