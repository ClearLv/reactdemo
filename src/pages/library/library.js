import React,{useState , useEffect , useReducer ,useContext} from "react";
import './library.css'
import {getAllBookInfo} from '../../http/http'
// import axios from "axios";
import axios from '../../http/myAxios'
import {Context} from "../../Home";

export const Library = () => {
    const [bookList , setBookList] = useState([]);
    const [changeBook , setChangeBook] = useState([]);
    const AppContext = useContext(Context);
    useEffect(() => {
        initData();
    },[])
    useEffect(() => {
        getItemTitleChange(AppContext);
    } , [AppContext])

    return (
        <div>
            <div className='image-size'>
                    {
                        changeBook.map((item , index) => {
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
        axios.get('/api/getAllBook').then((data) => {
            setBookList(data.data);
            setChangeBook(data.data);
        });
    }

    function getItemTitleChange(item){
        console.log(item.state.value);
        if(item.state.value == '文学'){
            // changeBookData('文学');
            setChangeBook(bookList.filter(item => item.cate == '文学'));
        }else if(item.state.value == '流行'){
            // changeBookData('流行');
            setChangeBook(bookList.filter(item => item.cate == '流行'));
        }else if(item.state.value == '经营'){
            // changeBookData('经营');
            setChangeBook(bookList.filter(item => item.cate == '经营'));
        }else if(item.state.value == '文化'){
            // changeBookData('文化');
            setChangeBook(bookList.filter(item => item.cate == '文化'));
        }else if(item.state.value == '生活'){
            // changeBookData('生活');
            setChangeBook(bookList.filter(item => item.cate == '生活'));
        }else if(item.state.value == '科技'){
            // changeBookData('科技');
            setChangeBook(bookList.filter(item => item.cate == '科技'));
        }
    }
}
