import React from "react";
import {connect} from "react-redux";
import {createPost, showAlert} from "../redux/actions";
import {Alert} from "./Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    submitHandler = e => {
        e.preventDefault();

        const{title} = this.state;
        if(!title.trim()){
            return this.props.showAlert('Заполни название post')
        }
        const newPost = {
            title, id: Date.now().toString()
        }
        console.log(newPost);
        this.props.createPost(newPost);
        this.setState({title: ''});
    }
    changeInputHandler = e => {
        // e.persist(); //возьмет синтезированное событие из пула событий и позволит сослаться на событие, чтобы сохранить код пользователя. - без него не дает ошибок
        this.setState(prev => ({...prev,...{
                [e.target.name]: e.target.value
            }}))
    }

    render() {
        return (

                <form onSubmit={this.submitHandler}>
                    {this.props.alert && <Alert text = {this.props. alert} />}
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Заголовок поста</label>
                        <input type="text" className="form-control" id="title" value={this.state.title} name="title"
                               onChange={this.changeInputHandler}/>
                        <button className={'btn btn-success'} type='submit'>Создать</button>
                    </div>
                </form>
        )
    }
}
const mapStateToProps = state => ({
    alert: state.app.alert
})
const mapDispatchToProps = {
    createPost, showAlert
}
export default connect(mapStateToProps,mapDispatchToProps)(PostForm)