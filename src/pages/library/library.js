import React,{useState , useEffect , useReducer} from "react";
import './library.css'
import {getAllBookInfo} from '../../http/http'
// import axios from "axios";
import axios from '../../http/myAxios'
import {reducer} from "../../reducer";
import {listReducer} from "../../reducer/listReducer";
import {bookReducer} from "../../reducer/bookReducer";

export const Library = () => {
    const [bookList , setBookList] = useState([]);
    let action = {};
    const [menu , dispatchMenu] = useReducer(listReducer);
    const [book , dispatchBook] = useReducer(bookReducer);
    useEffect(() => {
        initData();
        console.log(menu);
    } , [])
    return (
        <div>
            {console.log(menu)}
            <div className='image-size'>
                    {
                        bookList.map((item , index) => {
                            return(
                                <div key={index + 'a'} className='image-style'>
                                    <div key={index + 'b'}>
                                        <img key={index + 'c'} width={120} height={160} src={item.cover}/>
                                    </div>
                                    <div key={index + 'd'} style={{textAlign:'center',fontSize:13}}>{item.title}</div>
                                    <div key={index + 'e'} style={{textAlign:'center',fontSize:10}}>{item.author}</div>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
    function initData(){
        // getAllBookInfo.then((data) => {
        //     console.log(data);
        // })
        axios.get('/api/getAllBook').then((data) => {
            // console.log(data);
            setBookList(data.data);
            dispatchBook({type:'book' , data: data.data});
        });
        // console.log(getAllBookInfo);
    }
}
