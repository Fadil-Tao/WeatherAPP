import { AiOutlineSearch } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { BsWind } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherPage = () => {
    const [city, setCity] = useState('London');
    const [weatherDetails, setweatherDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const currentTime = () =>{
        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, '0');
        let currentYear = date.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

        return currentDate;
    }
    const getWeather = async () => {
        const apiKey = 'a9c5351b5a198fa8400da61a38defc64';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        setLoading(true);
        
        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log(data);
            const weather = {
                location: `${data.name}`,
                temperature: `${data.main.temp}`,
                condition: `${data.weather[0].description}`,
                humidity: `${data.main.humidity}`,
                image: `${data.weather[0].icon}`,
                wind: `${data.wind.speed}`,
            };
            setweatherDetails(weather);
            setLoading(false);
            console.log(weatherDetails);
        } catch (error) {
            console.log('error fethcing data' , error);
        }
    };
    useEffect(()=>{
        getWeather

    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-screen '>
            <div className='bg-white p-6 rounded shadow-md mb-4 bg-opacity-60'>
                <div className='flex items-center mb-4 '>
                    <input
                        type='text'
                        className='text-sm w-full text-slate-700 placeholder:opacity-50 rounded px-3'
                        placeholder='Search City'
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    />
                    <button
                        onClick={getWeather}
                        className='rounded-full bg-slate-700 text-neutral-50 p-2'
                        disabled={loading}
                    >
                        {loading ?"loading" :  <AiOutlineSearch />}
                    </button>
                </div>
                <div className='flex mb-4 justify-between'>
                    <p className='text-lg font-semibold mr-4'>
                        {weatherDetails ? weatherDetails.location : 'city'}
                    </p>
                    <p className='text-lg'>{currentTime()}</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col mb-4 max-w-fit mx-auto'>
                        {weatherDetails && weatherDetails.image && (
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherDetails.image}.png`}
                                alt='weather image'
                                className='rounded-full w-24 h-24'
                            />
                        )}
                        <p className='text-slate-600'>
                            {weatherDetails
                                ? weatherDetails.condition
                                : 'condition'}
                        </p>
                    </div>
                    <p className='text-xl font-semibold '>
                        {weatherDetails
                            ? `${weatherDetails.temperature}°C`
                            : 'Temperature'}
                    </p>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <WiHumidity className='text-blue-500 mr-2' />
                        <span className='text-gray-700'>Humidity:</span>{' '}
                        <span className='font-semibold ml-1'>
                            {weatherDetails
                                ? `${weatherDetails.humidity}%`
                                : 'xx%'}
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <BsWind className='text-blue-500 mr-2' />
                        <span className='text-gray-700'>Wind:</span>{' '}
                        <span className='font-semibold ml-1'>
                            {weatherDetails
                                ? `${weatherDetails.wind} km/h`
                                : 'xx km/h'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;
