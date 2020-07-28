import React,{useState , useEffect , useReducer ,useContext } from "react";
import './library.css'
import axios from '../../http/myAxios'
import {Context} from "../../Home";
import { Input , Button , Modal , Form , Select } from 'antd';

export const BookInfo = (props) => {
    const [bookInfo , setBookInfo] = useState({});

    useEffect(() => {
        // console.log(props.match.params.bookId);
        getBookInfo(props.match.params.bookId);
    },[props])

    return(
        <div className='bookinfo-container'>
            <img width={500} height={800} src='https://i.loli.net/2019/04/10/5cadaa0d0759b.jpg'/>
            <div className='bookinfo-context'>
                <div className='bookinfo-label'>作者：{bookInfo.author}</div>
                <div className='bookinfo-label'>书名：{bookInfo.title}</div>
                <div className='bookinfo-label'>简介：{bookInfo.abs}</div>
                <div className='bookinfo-label'>出版社：{bookInfo.press}</div>
            </div>
        </div>
    )

    function getBookInfo(bookId){
        axios.get('/api/getBookById',{params:{bookId:Number(bookId)}}).then((data) => {
            // console.log(data);
            setBookInfo(data.data);
        });
    }
}
