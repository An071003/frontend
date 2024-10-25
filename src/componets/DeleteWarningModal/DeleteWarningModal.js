import React from 'react';

const DeleteWarningModal = ({ isWarningOpen, onDeleteConfirm, onCancel }) => {
    if (!isWarningOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Cảnh báo xóa</h3>
                <p className="text-gray-700 mb-6">Bạn có chắc muốn xóa món ăn này? Hành động này không thể hoàn tác.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none"
                        onClick={onDeleteConfirm}
                    >
                        Xóa
                    </button>
                    <button
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarningModal;
