import React,{useState , useEffect , useReducer ,useContext } from "react";
import './library.css'
import axios from '../../http/myAxios'
import {Context} from "../../Home";
import { Input , Button , Modal , Form , Select , Upload , message } from 'antd';
import { UploadOutlined , LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export const BookInfo = (props) => {
    const [bookInfo , setBookInfo] = useState({});
    const [modalShow , setModalShow] = useState(false);
    const [loadStatus , setLoadStatus] = useState(false);
    const [cateList , setCateList] = useState([]);
    const [imageStatus ,setImageStatus] = useState({imageUrl:'',loading: false});
    const [imageLink , setImageLink] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log(props.match.params.bookId);
        getBookInfo(props.match.params.bookId);
    },[props])
    const uploadButton = (
        <div>
            {imageStatus.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    return(
        <div className='bookinfo-container'>
            <Button onClick={(e) => {goToEdit(e)}} style={{marginLeft:50}} type="primary">编辑</Button>
            <img width={500} height={600} src={bookInfo.cover}/>
            <div className='bookinfo-context'>
                <div className='bookinfo-label'>作者：{bookInfo.author}</div>
                <div className='bookinfo-label'>书名：{bookInfo.title}</div>
                <div className='bookinfo-label'>简介：{bookInfo.abs}</div>
                <div className='bookinfo-label'>出版社：{bookInfo.press}</div>
            </div>
            <Modal
                title="编辑详情"
                visible={modalShow}
                onOk={() => addBook()}
                confirmLoading={loadStatus}
                onCancel={() => handleCancel()}
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
                    <Form.Item label="封面">
                        {/*<Upload*/}
                        {/*    action={ 'http://localhost:8080/uploadBookCover/'}*/}
                        {/*    fileList={fileList}*/}
                        {/*    listType={'picture'}*/}
                        {/*    onSuccess={(e) => uploadSuccess(e)}*/}
                        {/*    onRemove={(e) => deletePic(e)}>*/}
                        {/*    <Button>*/}
                        {/*        <UploadOutlined /> Upload*/}
                        {/*    </Button>*/}
                        {/*</Upload>*/}
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            action="http://localhost:8080/uploadBookCover/"
                            onChange={(info) => handleChange(info)}
                        >
                            {imageStatus.imageUrl ? <img src={imageStatus.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
            setBookInfo(data.data);
        });
    }

    function addBook() {
        let params = form.getFieldsValue();
        params['cover'] = imageLink;
        params['id'] = props.match.params.bookId;
        axios.post('/api/editBookInfo',params).then((data) => {
            setModalShow(false);
            setLoadStatus(false);
        })
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
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

    }
    function handleChange(info) {
        if (info.file.status === 'uploading') {
            setImageStatus({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setImageLink(info.file.response)  ;
            getBase64(info.file.originFileObj, imageUrl =>
                setImageStatus({imageUrl:imageUrl,loading: false})
            );
        }
    }
}
