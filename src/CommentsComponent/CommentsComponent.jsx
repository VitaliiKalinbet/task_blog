import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addOneComment } from '../redux/actions/commentAction';
import { deleteCurrentPost } from '../redux/actions/currentPostAction';
import moment from 'moment';
import axios from 'axios';
import style from './CommentsComponent.module.css';

class CommentsComponent extends Component {

    state = {
        inputComment: '',
        currentPost: this.props.currentPost,
        comments: this.props.comment.filter(el => el.postId === this.props.currentPost.id) || [],
        dateComment: moment().format('LLL'),
    }

    handlerChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }

    addCommentToPost = async (evt) => {
        evt.preventDefault();
        let item = {
            body: this.state.inputComment,
            date: this.state.dateComment,
            postId: this.props.currentPost.id,
        }
        await axios.post('https://simple-blog-api.crew.red/comments', { ...item });
        await this.props.addOneComment(item);
        await this.setState({
            inputComment: '',
            comments: this.props.comment.filter(el => el.postId === this.props.currentPost.id) || [],
        })
    }

    render() {

        const { currentPost } = this.state;

        return (
            <div className={style.container}>

                <div className={style.header}>
                    <NavLink to='/posts'>
                        <button onClick={this.props.deleteCurrentPost} className={style.button}>Return to all posts</button>
                    </NavLink>
                </div>
                <div className={style.current_post}>
                    <h2 className={style.subtitle}>Current POST</h2>
                    <h2>{currentPost.title ? currentPost.title : 'Select post in prev page'}</h2>
                    <p>{currentPost.body ? currentPost.body : 'Select post in prev page'}</p>
                    <p><span className={style.span}>Author:</span> {currentPost.author ? currentPost.author : 'anonymous'}</p>
                    <p><span className={style.span}>Article publication time:</span> {currentPost.date ? currentPost.date : 'not set'}</p>
                    <p><span className={style.span}>Quantity comment:</span> {currentPost.quantityComments}</p>
                </div>
                <div className={style.comments}>
                    <h4 className={style.subtitle}>COMMENTS</h4>
                    {this.state.comments.length > 0 ?
                        this.state.comments.map(el =>
                            <ul>
                                <li>{el.body}   ({el.date})</li>
                            </ul>)
                        :
                        'This post has no comments, you can add it'}

                    <form onSubmit={this.addCommentToPost} className={style.form}>
                        <input name='inputComment' value={this.state.inputComment} onChange={this.handlerChange} required type="text" />
                        <button type='submit' className={style.button}>
                            Add comment to this post
                        </button>
                    </form>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post,
        comment: state.comment,
        currentPost: state.currentPost,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addOneComment: function (data) {
            dispatch(addOneComment(data))
        },
        deleteCurrentPost: function () {
            dispatch(deleteCurrentPost())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComponent);