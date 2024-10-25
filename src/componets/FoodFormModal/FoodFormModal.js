import React, { useState, useEffect } from 'react';

const FoodFormModal = ({
    isFormVisible, 
    isEditMode, 
    name, 
    price, 
    typeFood, 
    customTypeFood, 
    image, 
    typeFoodList, 
    onSubmit, 
    onClose, 
    onNameChange, 
    onPriceChange, 
    onTypeFoodChange, 
    onCustomTypeFoodChange, 
    onImageChange 
}) => {
    const [isCustomType, setIsCustomType] = useState(false);

    useEffect(() => {
        if (typeFood === 'Khác') {
            setIsCustomType(true);
        } else {
            setIsCustomType(false);
        }
    }, [typeFood]);

    if (!isFormVisible) return null;

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>{isEditMode ? 'Cập nhập món ăn' : 'Thêm món ăn'}</h3>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1" htmlFor="NameInput">
                            Tên món ăn
                        </label>
                        <input
                            className="w-full border-gray-300 border rounded px-3 py-2"
                            id="NameInput"
                            type="text"
                            placeholder="Tên món ăn"
                            value={name}
                            onChange={onNameChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1" htmlFor="PriceInput">
                            Giá
                        </label>
                        <input
                            className="w-full border-gray-300 border rounded px-3 py-2"
                            id="PriceInput"
                            type="number"
                            placeholder="Giá"
                            value={price}
                            onChange={onPriceChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-1" htmlFor="TypeFoodSelect">
                            Loại món ăn
                        </label>
                        <select
                            className="w-full border-gray-300 border rounded px-3 py-2"
                            id="TypeFoodSelect"
                            value={typeFood}
                            onChange={(e) => {
                                onTypeFoodChange(e);
                                setIsCustomType(e.target.value === 'Khác');
                            }}
                        >
                            <option value="" disabled hidden>--Chọn loại--</option>
                            {typeFoodList.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    {isCustomType && (
                        <div>
                            <label className="block text-gray-700 font-bold mb-1" htmlFor="CustomTypeInput">
                                Nhập loại khác
                            </label>
                            <input
                                className="w-full border-gray-300 border rounded px-3 py-2"
                                id="CustomTypeInput"
                                type="text"
                                placeholder="Nhập loại khác"
                                value={customTypeFood}
                                onChange={onCustomTypeFoodChange}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700 font-bold mb-1" htmlFor="ImageUpload">
                            Ảnh món ăn
                        </label>
                        <input
                            className="w-full px-3 py-2 text-gray-700"
                            type="file"
                            id="ImageUpload"
                            accept="image/png, image/jpeg"
                            onChange={onImageChange}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            {isEditMode ? 'Cập nhập' : 'Thêm'}
                        </button>

                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodFormModal;
