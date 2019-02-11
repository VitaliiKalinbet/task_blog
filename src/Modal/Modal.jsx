import React from 'react';
import PropTypes from "prop-types";
import style from './Modal.module.css';

const Modal = ({ titleArticle, bodyArticle, authorArticle, handlerChange, toggleModal, createArticle, editArticle, isEdit }) => {
    return (
        <div className={style.owerlay} onDoubleClick={toggleModal}>
            <div className={style.modal}>
                <span className={style.close} onClick={toggleModal}>x</span>
                <form action="" className={style.form} onSubmit={isEdit ? editArticle : createArticle}>
                    <label>Title article: <input value={titleArticle} onChange={handlerChange} name="titleArticle" type="text" required /></label>
                    <label>Text article: <input className={style.input} value={bodyArticle} onChange={handlerChange} name="bodyArticle" type="text" required /></label>
                    <label>Author article: <input value={authorArticle} onChange={handlerChange} name="authorArticle" type="text" required /></label>

                    <button>Save</button>
                </form>
            </div>
        </div>
    );
};

Modal.protoTypes = {
    titleArticle: PropTypes.string.isRequired,
    bodyArticle: PropTypes.string.isRequired,
    authorArticle: PropTypes.string.isRequired,
    handlerChange: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    createArticle: PropTypes.func.isRequired,
    editArticle: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
};

export default Modal;