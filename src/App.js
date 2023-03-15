import React, { useEffect, useState } from "react";

import axios from "axios";
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsThermometer, BsWater, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

const keyapi = 'cde55483c6bfe2759c035abf5cac4cca';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('bangkok');
  const [inputValue, setInputvalue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputvalue(e.target.value);
  };

  // console.log(inputValue);
  const handleSubmit = (e) => {
    // console.log(inputValue);
    // if input value is not empty
    if (inputValue !== '') {
      // set Location
      setLocation(inputValue);
    }

    // select input
    const input = document.querySelector('input');

    // if input value is  empty
    if (input.value === '') {
      setAnimate(true);
      // after 500ms set animate fo false
      setTimeout(() => {
        setAnimate(false);
      }, 500);

    }

    // clear input
    input.value = '';

    // prevent defualts
    e.preventDefault();
  };

  // fetch the data
  useEffect(() => {
    // set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${keyapi}`;

    axios.get(url).then((res) => {
      // set the data after 1500 ms
      setTimeout(() => {
        setData(res.data);

        // set loading to false
        setLoading(false);
      }, 1500);
      // setdata 
      setData(res.data);
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    });
  }, [location]);

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000)
    // clear timer
    return () => clearTimeout(timer);

  }, [errorMsg]);

  // if data is null  or false show the loader
  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    );
  }

  // set the icon 
  let icon;
  // console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    // switch ('Clear') {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
    // case 'Thunderstorm':
    //   icon = <IoMdThunderstorm />;
    //   break;
  }
  const date = new Date();

  return (

    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* <div className="text-6xl">{icon}</div> */}
      {errorMsg && <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c]
      text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">{`${errorMsg.response.data.message}`}</div>}
      {/* form */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent 
            outline-none 
            placeholder:text-white 
            text-white 
            text-[15px] 
            font-light
            pl-6 
            h-full"
            type="text"
            placeholder="Search by City or Country"
          />
          <button onClick={(e) => handleSubmit(e)} className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition">
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[548px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className='text-white text-5xl animate-spin' />

          </div>
        ) : (
          <div>
            {/* card top */}
            <div className=" flex items-center gap-x-5 ">
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold">{data.name} , {data.sys.country}</div>
                {/* data date */}
                <div className="text-1xl">{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
              </div>

            </div>
            {/* card body */}

            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[144px] leading-none ">
                  {parseInt(data.main.temp)}
                </div>
                {/* celsius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />

                </div>

              </div>
              {/* weather */}
              <div className="text-[30px] flex justify-center items-center">
                {data.weather[0].main}
              </div>
            </div>
            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between ">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div className="ml-2">
                    Visibility <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">Feel like
                    <div className="flex ml-2">{parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div className="ml-2">
                    Humidity <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div className="">Wind <span className="m-2">{data.wind.speed} m/s </span>
                    {/* <div className="flex ml-2">{parseInt(data.wind.speed)}
                    <TbTemperatureCelsius />
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

        }

      </div>
    </div>
  );
};

export default App;
