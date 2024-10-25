import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteWarningModal from '../../componets/DeleteWarningModal/DeleteWarningModal';
import FoodFormModal from '../../componets/FoodFormModal/FoodFormModal';
import './FoodManager.css';

const FoodManager = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [typeFood, setTypeFood] = useState('');
    const [customTypeFood, setCustomTypeFood] = useState('');
    const [typeFoodList, setTypeFoodList] = useState([]);
    const [foods, setFoods] = useState([]);
    const [groupedFoods, setGroupedFoods] = useState({});
    const [isOpen, setIsOpen] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch all food items
    const fetchFoods = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/foods');
            setFoods(response.data);
            const uniqueTypeFoods = [...new Set(response.data.map(food => food.typeFood))];
            setTypeFoodList(uniqueTypeFoods);
        } catch (error) {
            setError('Error fetching foods. Please try again.');
            console.error('Error fetching foods:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('typeFood', typeFood === 'Khác' ? customTypeFood : typeFood);
        if (image) {
            formData.append('image', image);
        } else {
            alert('Chưa thêm ảnh!');
            return;
        }

        const url = isEditMode ? `http://localhost:5000/api/foods/${foodToDelete}` : 'http://localhost:5000/api/foods';
        const method = isEditMode ? 'put' : 'post';

        try {
            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchFoods(); // Refresh food list
            resetForm();  // Reset form state
        } catch (error) {
            console.error('Error saving food:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setTypeFood('');
        setCustomTypeFood('');
        setImage(null);
        setIsEditMode(false);
        setIsFormVisible(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
                alert('Chỉ hỗ trợ file .JPG hoặc PNG');
                setImage(null);
                return;
            }
            setImage(file);
        }
    };

    const confirmDeleteFood = async () => {
        if (foodToDelete) {
            setLoading(true);
            setError(null);
            try {
                await axios.delete(`http://localhost:5000/api/foods/${foodToDelete}`);
                fetchFoods();
                setIsWarningOpen(false);
            } catch (error) {
                setError('Error deleting food. Please try again.');
                console.error('Error deleting food:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteClick = (id) => {
        setFoodToDelete(id);
        setIsWarningOpen(true);
    };

    const toggleFoodList = (type) => {
        setIsOpen((prevState) => ({ ...prevState, [type]: !prevState[type] }));
    };

    const handleEditClick = (food) => {
        setName(food.name);
        setPrice(food.price);
        setTypeFood(food.typeFood);
        setImage(food.image);
        setFoodToDelete(food._id);
        setIsEditMode(true);
        setIsFormVisible(true);
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    useEffect(() => {
        const grouped = foods.reduce((acc, food) => {
            const type = food.typeFood || 'Unknown';
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(food);
            return acc;
        }, {});
        setGroupedFoods(grouped);
    }, [foods]);
    

    return (
        <div>
            <div className='FoodListBG'>
                <div className="px-12">
                    <h1 className="FMTitle">Food Management</h1>
                    <button className='add-btn' onClick={() => {
                        resetForm();
                        setIsFormVisible(true);
                    }}>Thêm món</button>
                    {error && <p className="text-red-500">{error}</p>}
                    {loading && <p>Loading...</p>}
                    {Object.entries(groupedFoods).map(([type, foods]) => (
                        <div key={type} className="my-4">
                            <h5 onClick={() => toggleFoodList(type)} className="cursor-pointer">
                                {type} ({foods.length}) {isOpen[type] ? '▲' : '▼'}
                            </h5>
                            {!isOpen[type] && (
                                <div className="flex flex-wrap gap-4 text-center">
                                    {foods.map((food) => (
                                        <div key={food._id} className="flex flex-col justify-between border w-[200px] pt-4 rounded-md h-[300px]"> 
                                            <div className="flex justify-center items-center mb-2">
                                                <img src={food.image} alt={food.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md" />
                                            </div>
                                            <div className="font-semibold">{food.name}</div>
                                            <div className="text-yellow-500 font-bold">{food.price} VND</div>
                                            <div className="mt-auto"> 
                                                <button className='Editbtn' onClick={() => handleEditClick(food)}>Edit</button>
                                                <button className="Deletebtn" onClick={() => handleDeleteClick(food._id)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete warning modal */}
            <DeleteWarningModal 
                isWarningOpen={isWarningOpen} 
                onDeleteConfirm={confirmDeleteFood} 
                onCancel={() => setIsWarningOpen(false)} 
            />

            {/* Food form modal */}
            <FoodFormModal 
                isFormVisible={isFormVisible}
                isEditMode={isEditMode}
                name={name}
                price={price}
                typeFood={typeFood}
                customTypeFood={customTypeFood}
                image={image}
                typeFoodList={typeFoodList}
                onSubmit={handleSubmit}
                onClose={() => setIsFormVisible(false)}
                onNameChange={(e) => setName(e.target.value)}
                onPriceChange={(e) => setPrice(e.target.value)}
                onTypeFoodChange={(e) => setTypeFood(e.target.value)}
                onCustomTypeFoodChange={(e) => setCustomTypeFood(e.target.value)}
                onImageChange={handleFileChange}
            />
        </div>
    );
};

export default FoodManager;