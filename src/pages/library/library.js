import React,{useState , useEffect , useReducer ,useContext } from "react";
import './library.css'
import axios from '../../http/myAxios'
import {Context} from "../../Home";
import { Input , Button , Modal , Form , Select } from 'antd';


const { Search } = Input;
const { Option } = Select;
export const Library = (props) => {
    const [bookList , setBookList] = useState([]);
    const [changeBook , setChangeBook] = useState([]);
    const [cateList , setCateList] = useState([]);
    const AppContext = useContext(Context);
    const [modalShow , setModalShow] = useState(false);
    const [loadStatus , setLoadStatus] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        initData();
    },[])
    useEffect(() => {
        getItemTitleChange(AppContext);
    } , [AppContext])

    return (
        <div>
            <div className='head-bar'>
                <Search placeholder="搜索" onSearch={value => console.log(value)} enterButton />
                <Button onClick={(e) => {goToAdd(e)}} style={{marginLeft:50}} type="primary">添加</Button>
            </div>
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
            <Modal
                title="添加"
                visible={modalShow}
                onOk={() => addBook()}
                confirmLoading={loadStatus}
                onCancel={() => handleCancel}
            >
                <Form form={form}>
                    <Form.Item name="title" label="书名">
                        <Input placeholder="书名" />
                    </Form.Item>
                    <Form.Item name="author" label="作者">
                        <Input placeholder="作者" />
                    </Form.Item>
                    <Form.Item name="date" label="出版日期">
                        <Input placeholder="出版日期" />
                    </Form.Item>
                    <Form.Item name="press" label="出版社">
                        <Input placeholder="出版社" />
                    </Form.Item>
                    <Form.Item name="cover" label="封面">
                        <Input placeholder="封面" />
                    </Form.Item>
                    <Form.Item name="abs" label="简介">
                        <Input placeholder="简介" />
                    </Form.Item>
                    <Form.Item name="cid" label="分类">
                        <Select placeholder="请选择">
                            {cateList.map((item , index) => {
                                return (<Option key={index}
                                                value={item.id}>{item.name}</Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
    function goToAdd(e){
        axios.get('/api/getAllCate').then((data) => {
            setCateList(data.data);
            setModalShow(true);
        });

    }

    function initData(){
        axios.get('/api/getAllBook').then((data) => {
            setBookList(data.data);
            setChangeBook(data.data)
        });
    }

    function getItemTitleChange(item){
        console.log(item.state.value);
        if(item.state.value == '文学'){
            setChangeBook(bookList.filter(item => item.cate == '文学'));
        }else if(item.state.value == '流行'){
            setChangeBook(bookList.filter(item => item.cate == '流行'));
        }else if(item.state.value == '经营'){
            setChangeBook(bookList.filter(item => item.cate == '经营'));
        }else if(item.state.value == '文化'){
            setChangeBook(bookList.filter(item => item.cate == '文化'));
        }else if(item.state.value == '生活'){
            setChangeBook(bookList.filter(item => item.cate == '生活'));
        }else if(item.state.value == '科技'){
            setChangeBook(bookList.filter(item => item.cate == '科技'));
        }else if(item.state.value == '全部'){
            setChangeBook(bookList);
        }
    }

    function addBook() {

        // console.log(form.getFieldsValue());
        // form
        //     .validateFields()
        //     .then(values => {
        //         console.log(values);
        //         form.resetFields();
        //
        //     })
        //     .catch(info => {
        //         console.log('Validate Failed:', info);
        //     });
        let params = form.getFieldsValue();
        axios.post('api/postBookInfo',params).then((data) => {
            console.log(data);
        })

        setModalShow(false);
        setLoadStatus(false);
    }

    function handleCancel() {
        setModalShow(false);
    }
}
