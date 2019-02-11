import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../redux/actions/blogAction';
import { fetchDataComment } from '../redux/actions/commentAction';
import { selectCurrentPost } from '../redux/actions/currentPostAction';
import Modal from '../Modal/Modal';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import style from './AllPostComponent.module.css';
import deleteIcon from '../img/delete.png';
import editIcon from '../img/edit.png';
import PropTypes from "prop-types";

class AllPostComponent extends Component {

  state = {
    titleArticle: '',
    bodyArticle: '',
    authorArticle: this.props.author || 'anonymous',
    dateArticle: moment().format('LLL'),
    showModal: false,
    id: '',
    isEdit: false,
    editId: '',
  }

  componentDidMount = () => {
    this.props.fetchData();
    this.props.fetchDataComment();
  }

  handlerChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  toggleModal = (e) => {
    this.setState(prev => ({
      showModal: !prev.showModal
    }))
  }

  createArticle = async (evt) => {
    evt.preventDefault();
    let item = {
      title: this.state.titleArticle,
      body: this.state.bodyArticle,
      author: this.state.authorArticle,
      date: this.state.dateArticle
    }
    await this.setState({
      titleArticle: '',
      bodyArticle: ''
    })
    await axios.post('https://simple-blog-api.crew.red/posts', { ...item });
    this.toggleModal(evt);
    this.props.fetchData();
  }

  deleteArticle = async (evt) => {
    let id = evt.target.dataset.id;
    await axios.delete(`https://simple-blog-api.crew.red/posts/${id}`);
    this.props.fetchData();
  }

  showArticleWithInfo = async (evt) => {
    let id = evt.target.dataset.id;
    let editArticleObj = this.props.post.find(el => el.id === Number(id));
    await this.setState({
      titleArticle: editArticleObj.title,
      bodyArticle: editArticleObj.body,
      authorArticle: editArticleObj.author,
      dateArticle: editArticleObj.date,
      isEdit: true,
      editId: id,
    });
    this.toggleModal(evt);
  }

  editArticle = async (evt) => {
    evt.preventDefault();
    let id = this.state.editId;
    let item = {
      title: this.state.titleArticle,
      body: this.state.bodyArticle,
      author: this.state.authorArticle,
      date: this.state.dateArticle,
    }
    await this.setState({
      titleArticle: '',
      bodyArticle: '',
      isEdit: false,
      editId: '',
    })
    await axios.put(`https://simple-blog-api.crew.red/posts/${id}`, { ...item });
    await this.props.fetchData();
    this.toggleModal(evt);
  }

  addInReduxCurrentPost = (evt) => {
    let id = Number(evt.target.dataset.id);
    let currentPost = this.props.post.find(el => el.id === id)
    this.props.selectCurrentPost(currentPost);
  }

  render() {
    return (
      <div className={style.container}>

        <div className={style.header}>
          <button className={style.button} onClick={this.toggleModal}>Add article</button>
          <NavLink to='/'>
            <button className={style.button}>Exit blog</button>
          </NavLink>

          {this.state.showModal && <Modal titleArticle={this.state.titleArticle} bodyArticle={this.state.bodyArticle} authorArticle={this.state.authorArticle} handlerChange={this.handlerChange} toggleModal={this.toggleModal} createArticle={this.createArticle} editArticle={this.editArticle} isEdit={this.state.isEdit} />}
        </div>

        <div className={style.all_posts}>
          {this.props.post.map(el =>
            <div key={el.id} className={style.card}>
              <div className={style.icon_box}>
                <img data-id={el.id} onClick={this.showArticleWithInfo} className={style.icon} src={editIcon} alt="editIcon" />
                <img data-id={el.id} onClick={this.deleteArticle} className={style.icon} src={deleteIcon} alt="deleteIcon" />
              </div>
              <h2>{el.title}</h2>
              <p>{el.body}</p>
              <p><span className={style.span}>Author:</span> {el.author ? el.author : 'anonymous'}</p>
              <p><span className={style.span}>Article publication time:</span> {el.date ? el.date : 'not set'}</p>
              <p><span className={style.span}>Quantity comment:</span> {el.quantityComments}</p>

              <NavLink to='/comments'>
                <button onClick={this.addInReduxCurrentPost} data-id={el.id} className={style.btn_comments}>This article comments</button>
              </NavLink>
            </div>)}

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: function () {
      dispatch(fetchData());
    },
    fetchDataComment: function () {
      dispatch(fetchDataComment())
    },
    selectCurrentPost: function (data) {
      dispatch(selectCurrentPost(data))
    },
  }
}

AllPostComponent.protoTypes = {
  author: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPostComponent);