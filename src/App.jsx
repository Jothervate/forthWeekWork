import {useState,useEffect,useRef} from 'react';
import * as bootstrap from 'bootstrap';
import axios from "axios";

//插入元件

import Not_log from './component/Not_log';

import Logging from './component/Logging';

import AddProduct from './component/AddProduct';

import Pagination from './component/Pagination';

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

//建置原始資料

export const INITIAL_TEMPLATE_DATA = {
    id: "",
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: false,
    imageUrl: "",
    imagesUrl: [],
    goings: "",
};

// 建置分頁資料

const PRODUCTS_PAGE={
    // API 文件說明：回傳的資料格式
    "pagination": {
    "total_pages": 1,
    "current_page": 1,
    "has_pre": false,
    "has_next": false,
    "category": "" // 分頁顯示不需要
    },
};




//react 建置
function App(){

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isAuth, setIsAuth] = useState(false);
    const [products, setProducts] = useState([]);
    const [tempProduct, setTempProduct] = useState(null);
    //等等會用到的產品功能判斷
    const productModalRef= useRef(null);

    const [modalType,setModalType]= useState('');
    const [templateData,setTemplateData]=useState(INITIAL_TEMPLATE_DATA); 

    // 分頁設計
    const [pagination,setPagination]=useState({});


    // 1. 封裝：設定 Token 到 Cookie 與 Axios Header
    const setAuthToken = (token, expired) => {
        // 存入 Cookie
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/;`;
        // 設定 Axios 預設 Header
        axios.defaults.headers.common['Authorization'] = token;
    };

    // 2. 封裝：取得產品資料 (加上防錯)
    const getDatas = async (page=1) => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
            //將取得產品的資料內容放置到products,之後會套用到該資料庫內容
            setProducts(res.data.products);

            // 並且取得分頁資料
            setPagination(res.data.pagination);
            // 「透過 JavaScript 手動控制 Bootstrap 彈出視窗（Modal）」

            // document.getElementById('productModal'): 這是去抓取 HTML 結構中 id 為 productModal 的那個 <div>。

            // new bootstrap.Modal(...): 這是 Bootstrap 的建構函式。它會把剛才抓到的 DOM 元素轉換成一個「可操作的 Modal 物件」。

            // keyboard: false: 這是一個設定參數。意思是「當視窗打開時，使用者按下鍵盤上的 ESC 鍵 不會關閉視窗」。
            // 這通常用於強制使用者必須點擊「取消」或「確認」按鈕。

            // productModalRef.current = ...: 老師使用了 React 的 useRef。將建立好的 Modal 實例存放在 ref 中，
            // 這樣在其他的 function（例如新增成功後要關閉視窗）就能透過 productModalRef.current.hide() 來控制它。

            productModalRef.current=new bootstrap.Modal(document.getElementById('productModal'), {
                keyboard: false
            })
        } catch (err) {
            console.error("取得產品失敗", err.response?.data?.message || err.message);
        }
    };

    // 3. 處理輸入變更
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 會根據不同的輸入框名稱,來抓出對應資料
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //處理新增產品資料方法
    const handleModalInputChange=(e)=>{
        const {name,value,checked,type}=e.target;
        
        // 如果產品資訊類型為"checkbox",則會判斷是否checked;否則就取出該e.target的value值
        setTemplateData((pre)=>({
            ...pre,
            [name]: type==="checkbox"?checked:value
        }))
    }

    //處理多層圖片轉換
    const handleModalImageChange=(index,value)=>{
        setTemplateData((pre)=>{
            const newImage =[...pre.imagesUrl];
            newImage[index]=value;

            //當陣列資料不滿五筆時,會因為自動加入子圖片而加入新圖片提示框
            if(value !=="" && index ===newImage.length-1 &&newImage.length<5){
                newImage.push('')
            };

            //若陣列資料不少於一筆,且在自動更新後發現資料串為空值,則該筆資料輸入框會被取消
            if(value==="" && newImage.length>1 &&newImage[newImage.length-1]===""){
                newImage.pop();
            }
            return {
                ...pre,
                imagesUrl: newImage
            }
        })
    };

    //新增input圖片區
    const handleAddImage=()=>{
        setTemplateData((pre)=>{
            const newImage =[...pre.imagesUrl];
            newImage.push('');

            return {
                ...pre,
                imagesUrl: newImage
            }
        })
    };

    
    //移除input圖片區
    const handleRemoveImage=()=>{
        setTemplateData((pre)=>{
            const newImage =[...pre.imagesUrl];
            newImage.pop();

            return {
                ...pre,
                imagesUrl: newImage
            }
        })
    };


    // 4. 登入提交
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE}/admin/signin`, formData);
            const { token, expired } = res.data;

            // 執行封裝好的設定
            setAuthToken(token, expired);
            
            alert("登入成功");
            setIsAuth(true);
            getDatas(); // 登入成功後直接抓資料
        } catch (err) {
            alert("登入失敗：" + (err.response?.data?.message || "請檢查帳密"));
            setIsAuth(false);
        }
    };

    // 確認登入函式
    const checkLogin = async () => {
        try {
            // 這裡不需要 formData，因為驗證是靠 Header 裡的 Token
            const res = await axios.post(`${API_BASE}/api/user/check`);
            
            // 如果成功，res.data 通常會包含 success: true 與 uid
            if (res.data.success) {
                // 提醒：請確認該 API 是否有回傳 uid，部分版本是在 res.data.uid
                alert(`驗證成功！`);
                // console.log("完整驗證資訊：", res.data);
                setIsAuth(true); // 確保狀態同步
            }
        } catch (err) {
            console.error("驗證失敗：", err.response?.data?.message);
            alert(`驗證失敗或登入已過期，請重新登入`);
            setIsAuth(false);
        }
    };

    // 5. 元件掛載時檢查 Cookie
    useEffect(() => {
        const token = document.cookie
            .replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if (token) {
            // 先把 Token 塞入 Header
            axios.defaults.headers.common['Authorization'] = token;

            
            // 驗證 Token 是否依然有效
            axios.post(`${API_BASE}/api/user/check`)
                .then(() => {
                    setIsAuth(true);
                    getDatas(); // 驗證成功才抓資料
                })
                .catch((err) => {
                    console.error("驗證失效", err);
                    setIsAuth(false);
                });
        }
    }, []);
    
    const openModal=(type,product)=>{
        // console.log(product);
        setModalType(type);

        setTemplateData(({
            ...INITIAL_TEMPLATE_DATA,
            ...product
        }));

        productModalRef.current.show();
    };

    const closeModal=()=>{
        productModalRef.current.hide();
    };

    //根據不同條件來決定執行甚麼功能

    const updateProduct= async(id)=>{

        let url= `${API_BASE}/api/${API_PATH}/admin/product`;
        let method="post";

        if(modalType==="edit"){
            url=`${API_BASE}/api/${API_PATH}/admin/product/${id}`;
            method="put";
        }

        if(modalType==="create"){
            url=`${API_BASE}/api/${API_PATH}/admin/product`;
            method="post"
        }

        if(modalType==="delete"){
            url=`${API_BASE}/api/${API_PATH}/admin/product/${id}`
            method="delete"
        }

        //設定資料庫內容

        const productData ={
            data:{
                ...templateData,
                origin_price: Number(templateData.origin_price),
                price: Number(templateData.price),
                is_enabled: templateData.is_enabled? 1:0,
                imagesUrl: templateData.imagesUrl.filter((url)=>url!=="")
            }
        }

        try{
            const res= await axios({
                method:method, //動態輸入post||put
                url: url,
                data: productData
            });

            console.log(res.data);
            alert(modalType==="edit"?"更新資料成功":"新增資料成功");
            // 當一切輸入成功後,就會取得新資料
            getDatas();
            // 並且關閉更新資料頁面
            closeModal();
        }catch(err){
            const errorMsg = err.response?.data?.message || "發生未知錯誤";
            alert(`發生${errorMsg}錯誤`)
        }
    };

    //刪除資料
    const delProduct = async(id)=>{
        try{
            const res= await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${id}`);
            console.log(res.data);
            alert(`${res.data.message}`)
            getDatas();
            closeModal();
        }catch(err){
            alert(`發生${err.response}錯誤!`)
        }
    };


    return (
        <>
            {!isAuth?(
                <>
                    <Not_log onSubmit={onSubmit} handleInputChange={handleInputChange}
                    formData={formData}/>
                </>
            ):(
                <>
                    <Logging checkLogin={checkLogin}
                    products={products} tempProduct={tempProduct} openModal={openModal}/>
                    <Pagination pagination={pagination} onChangePage={getDatas}/>

                    <AddProduct productModalRef={productModalRef} closeModal={closeModal} 
                        templateData={templateData}
                        setTemplateData={setTemplateData}  
                        handleModalInputChange={handleModalInputChange}
                        handleModalImageChange={handleModalImageChange} handleAddImage={handleAddImage}
                        handleRemoveImage={handleRemoveImage} updateProduct={updateProduct}
                        modalType={modalType} delProduct={delProduct} />
                </>
            )}
        </>
    )
}

export default App;