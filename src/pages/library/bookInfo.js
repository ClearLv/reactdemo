import React,{useState , useEffect , useReducer ,useContext } from "react";
import './library.css'
import axios from '../../http/myAxios'
import {Context} from "../../Home";
import { Input , Button , Modal , Form , Select , Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const fileList = [
    // {
    //     uid: '-1',
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //     uid: '-2',
    //     name: 'yyy.png',
    //     status: 'error',
    // },
];
export const BookInfo = (props) => {
    const [bookInfo , setBookInfo] = useState({});
    const [modalShow , setModalShow] = useState(false);
    const [loadStatus , setLoadStatus] = useState(false);
    const [cateList , setCateList] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log(props.match.params.bookId);
        getBookInfo(props.match.params.bookId);
    },[props])

    return(
        <div className='bookinfo-container'>
            <Button onClick={(e) => {goToEdit(e)}} style={{marginLeft:50}} type="primary">添加</Button>
            <img width={500} height={600} src={bookInfo.cover}/>
            <div className='bookinfo-context'>
                <div className='bookinfo-label'>作者：{bookInfo.author}</div>
                <div className='bookinfo-label'>书名：{bookInfo.title}</div>
                <div className='bookinfo-label'>简介：{bookInfo.abs}</div>
                <div className='bookinfo-label'>出版社：{bookInfo.press}</div>
            </div>
            <Modal
                title="添加"
                visible={modalShow}
                onOk={() => addBook()}
                confirmLoading={loadStatus}
                onCancel={() => handleCancel}
            >
                <Form form={form} initialValues={bookInfo}>
                    <Form.Item name="title" label="书名">
                        {/*<Input placeholder="书名" defaultValue={bookInfo.title}/>*/}
                        <Input placeholder="书名" name='title'/>
                    </Form.Item>
                    <Form.Item name="author" label="作者">
                        <Input placeholder="作者" name='author'/>
                    </Form.Item>
                    <Form.Item name="date" label="出版日期">
                        <Input placeholder="出版日期" name='date'/>
                    </Form.Item>
                    <Form.Item name="press" label="出版社">
                        <Input placeholder="出版社" name='press'/>
                    </Form.Item>
                    <Form.Item name="cover" label="封面">
                        <Upload
                            action={ 'http://localhost:8080/uploadBookCover/'}
                            fileList={fileList}
                            listType={'picture'}
                            onSuccess={(e) => uploadSuccess(e)}
                            onRemove={(e) => deletePic(e)}>
                            <Button>
                                <UploadOutlined /> Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="abs" label="简介">
                        <Input placeholder="简介" name='abs'/>
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

    function getBookInfo(bookId){
        axios.get('/api/getBookById',{params:{bookId:Number(bookId)}}).then((data) => {
            // console.log(data);
            setBookInfo(data.data);
        });
    }

    function addBook() {

        let params = form.getFieldsValue();
        console.log(params);
        // axios.post('api/postBookInfo',params).then((data) => {
        //     console.log(data);
        // })

        setModalShow(false);
        setLoadStatus(false);
    }

    function handleCancel() {
        setModalShow(false);
    }

    function goToEdit(e){
        axios.get('/api/getAllCate').then((data) => {
            setCateList(data.data);
            setModalShow(true);
        });
    }

    function fileChange(e) {
        console.log(fileList);
        console.log(e);
    }

    function uploadSuccess(e) {
        console.log(e);
        console.log(fileList);
        fileList.push( {

            uid: (new Date()).getMilliseconds(),
            name: (new Date()).getMilliseconds() + '.png',
            status: 'done',
            url: e,
            thumbUrl: e,

        })
        console.log(fileList);
    }

    function deletePic(e) {
        console.log(e);
    }
}
