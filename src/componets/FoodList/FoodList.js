import { useEffect, useState } from "react";
import axios from 'axios';
import "./FoodList.css"

const FoodList = () => {
    const [groupedFoods, setGroupedFoods] = useState({});
    const [isOpen, setIsOpen] = useState({});
    const [navScrolled, setNavScrolled] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);
    const [foods, setFoods] = useState([]);

    // Fetch all food items
    const fetchFoods = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/foods');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // Toggle food list display
    const toggleFoodList = (type) => {
        setIsOpen((prevState) => ({ ...prevState, [type]: !prevState[type] }));
    };

    // Group food items by their category/typeFood
    useEffect(() => {
        if (foods.length > 0) {
            const grouped = foods.reduce((acc, food) => {
                const type = food.typeFood;
                if (!acc[type]) {
                    acc[type] = [];
                }
                acc[type].push(food);
                return acc;
            }, {});
            setGroupedFoods(grouped);
        }
    }, [foods]);

    useEffect(() => {
        const headerElement = document.querySelector("nav");
        if (headerElement) {
            setHeaderHeight(headerElement.offsetHeight);
            setNavHeight(headerElement.offsetHeight);
        }

        const handleScroll = () => {
            setNavScrolled(window.scrollY > headerHeight);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [headerHeight]);

    const scrollToSection = (type) => {
        const element = document.getElementById(type);
        if (element) {
            let offsetPosition = element.getBoundingClientRect().top + window.scrollY - (headerHeight + navHeight);
            if(window.scrollY == 0){
                offsetPosition = offsetPosition - 30
            }
            console.log(offsetPosition)
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div>
            <nav className={`listnav navigation transition-all duration-300 z-10 ${navScrolled ? `fixed bg-slate-500 text-white shadow-lg` : 'relative bg-transparent text-black'}`}
                style={{ top: navScrolled ? `${headerHeight}px` : '0'}}>
                <ul className="flex space-x-4">
                    {Object.keys(groupedFoods).map((type) => (
                        <li key={type}>
                            <a
                                href={`#${type}`}
                                className="hover:underline cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(type);
                                }}
                            >
                                {type}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="listfood">
                {Object.entries(groupedFoods).map(([type, foods]) => (
                <div key={type} className="my-4" id={type}>
                    <h5 className="mb-3 flex items-center justify-between cursor-pointer" style={{ marginTop: "10px" }} onClick={() => toggleFoodList(type)}>
                        <span className="text-lg font-semibold">{type}</span>
                        <div className="border border-dashed h-px grow mx-2"></div>
                        {isOpen[type] ? '▼' : '▲'}
                    </h5>
                    <div className={`transition-all duration-300 ${isOpen[type] ? 'hidden' : ''}`}>
                        <div className="grid grid-cols-6">
                            {foods.map((food) => (
                                <div key={food._id} className="text-center border p-4 rounded-md shadow-sm" style={{ width: "160px", height: "250px" }}>
                                    {food.image && (
                                        <img
                                            src={food.image}
                                            className="w-full h-32 object-cover mb-2"
                                            style={{ borderRadius: "8px" }}
                                            alt={food.name}
                                        />
                                    )}
                                    <p className="font-semibold">{food.name}</p>
                                    <p className="text-yellow-500 font-bold">{food.price} VND</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default FoodList;
