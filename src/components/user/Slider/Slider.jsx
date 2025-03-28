/*
    Lưu ý: 
    - Khi dùng slider sẽ có id cần truyền vào nếu dùng từ >= 2 cái slider trong cùng 1 trang
    - type: 1 là silder dọc (có banner), 2 là slider ngang (không banner)
    - number: số lượng item hiển thị trong 1 lần slide
    - icons: hiển thị icon hay không
    - banner: hiển thị banner hay không
    - data: dữ liệu cần hiển thị
    - title: tiêu đề slider
*/


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faAngleLeft, faAngleRight, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { IoSparkles } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Slider = ({ data, title, icons, banner, number, type, id }) => {
    const URL_IMG = "https://phimimg.com/"; // URL của nơi chứa ảnh
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerSlide = number ?? 5;

    const nextSlide = () => {
        console.log(currentSlide);

        setCurrentSlide((prev) => prev === data.length - itemsPerSlide ? 0 : Math.min(prev + itemsPerSlide, data.length - itemsPerSlide));
    };

    const prevSlide = () => {
        const prevIndex = Math.max(currentSlide - itemsPerSlide, 0);
        setCurrentSlide((prev) => prev === 0 ? data.length - itemsPerSlide : prevIndex);
    };

    useEffect(() => {
        const slider = document.getElementById(`${id ? id : 'slider'}`);
        slider.style.transform = `translateX(-${(currentSlide * 100) / data.length}%)`;
    }, [currentSlide, data]);

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
                <Link to="/all-movies">
                    <p className="text-blue-500 underline hover:text-blue-600">See all {'>'}{'>'}{'>'}</p>
                </Link>
            </div>
            <div className={`relative w-full  py-2 overflow-hidden  ${type === 1 ? 'h-76' : 'h-40'}`}>
                <div id={`${id ? id : 'slider'}`} className="absolute flex gap-2 transform transition-transform duration-1000 " style={{ width: `${data.length * (100 / itemsPerSlide)}%` }}>
                    {type === 1 ? data.map((item, index) => (
                        <div
                            className="relative h-72 bg-gray-300 rounded-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            key={index}
                            style={{ width: `${100 / itemsPerSlide}%` }}
                        >
                            <Link>
                                <img
                                    className="w-full h-4/5 object-cover object-center"
                                    src={URL_IMG + item.poster_url}
                                    alt={item.name}
                                    title={item.name}
                                />
                            </Link>
                            <div className="w-full h-1/5 p-2">
                                <Link><p className="hover:text-orange-600 hover:font-bold text-center line-clamp-2 overflow-ellipsis">{item.name}</p></Link>
                            </div>
                            <div className={`absolute top-2 right-2 font-bold text-white bg-red-500 p-1 rounded-md ${!banner ? 'hidden' : ''}`}>{banner}</div>
                            {index % 2 === 0 && icons && (
                                <div className="absolute top-2 left-2 font-bold rounded-md p-1 bg-white">
                                    <IoSparkles color="blue" className="text-2xl" />
                                </div>
                            )}
                        </div>
                    )) :
                        data.map((item, index) => (
                            <div
                                className="relative h-36 bg-gray-300 rounded-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
                                key={index}
                                style={{ width: `${100 / itemsPerSlide}%` }}
                            >
                                <img
                                    className="w-full h-4/5 object-cover object-center"
                                    src={URL_IMG + item.thumb_url}
                                    alt={item.name}
                                    title={item.name}
                                />
                                <div className="w-full h-1/5 px-2">
                                    <p className="hover:text-orange-600 hover:font-bold text-center line-clamp-2 overflow-ellipsis">{item.name}</p>
                                </div>
                                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-50 opacity-0 hover:opacity-40 transition-opacity duration-300">
                                    <FontAwesomeIcon icon={faPlayCircle} className="text-4xl text-white active:text-orange-500" />
                                </div>
                            </div>
                        ))}

                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-20 w-10 bg-gradient-to-r from-black to-transparent flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100" onClick={prevSlide}>
                    <FontAwesomeIcon icon={faAngleLeft} className="text-4xl text-white active:text-orange-500" />
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-30 w-10 opacity-50 hover:opacity-100  bg-gradient-to-l from-black to-transparent flex items-center justify-center cursor-pointer" onClick={nextSlide}>
                    <FontAwesomeIcon icon={faAngleRight} className="text-4xl text-white active:text-orange-500" />
                </div>
            </div>
        </div>
    );
};

export default Slider;