// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
import axios from "axios";
//新增產品頁面(或是刪除產品頁面)
const AddProduct=({templateData,setTemplateData,closeModal,handleModalInputChange,handleModalImageChange
    ,handleAddImage,handleRemoveImage,updateProduct,modalType,delProduct})=>{

    const uploadImg= async(e)=>{
        const file= e.target.files?.[0];
        if(!file) {
            return
        }

        try{
            const formData= new FormData();
            formData.append('file-to-upload',file);

            const res =await axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`,formData);

            setTemplateData((pre)=>({
                ...pre,
                imageUrl: res.data.imageUrl
            }));
        }catch(err){
            alert(`上傳圖片發生:${err.message}錯誤!`)
        }
    };
    
    const handleGoingsChange=(e)=>{
        const value= e.target.value;
        setTemplateData((pre)=>{
            return {
                ...pre,
                goings:value
            }
        })
    }

    return (
    <div className="modal fade" tabIndex="-1"
        id="productModal" aria-labelledby='productModalLabel'
        aria-hidden='true'>
        <div className="modal-dialog modal-xl">
            <div className="modal-content border-0">
                <div className={`modal-header bg-${modalType==="delete"?"danger":"dark"} text-white`}>
                    <h5 id="productModalLabel" className="modal-title">
                    <span>{modalType==="delete"?"移除":
                        modalType==="edit"?"編輯":"新增"}產品</span>
                    </h5>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>

                {
                    modalType==="delete"?(
                        <>
                            {/* modal-body 顯示內容 */}
                            <div className="modal-body">
                                <p className="fs-4">
                                確定要刪除
                                <span className="text-danger">{templateData.title}</span>嗎？
                                </p>
                            </div>

                            {/* modal-footer 刪除按鈕 */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={()=>delProduct(templateData.id)}
                                >
                                    刪除
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={()=>closeModal()}
                                >
                                    取消
                                </button>
                            </div>
                        </>
                    ):(<>
                        <div className="modal-body">
                            <div className="row">
                            <div className="col-sm-4">
                                <div className="mb-2">
                                    <div className="mb-3">
                                        <label htmlFor="fileUpload" className="form-label">
                                        上傳圖片
                                        </label>
                                        <input
                                            type="file"
                                            id="fileUpload"
                                            name="imageUrl"
                                            accept=".jpg,.png,.jpeg"
                                            className="form-control"
                                            onChange={(e)=>uploadImg(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="imageUrl" className="form-label">
                                        輸入主圖片網址
                                        </label>
                                        <input
                                            type="text"
                                            id="imageUrl"
                                            name="imageUrl"
                                            className="form-control"
                                            placeholder="請輸入主圖片連結"
                                            value={templateData.imageUrl}
                                            onChange={(e)=>handleModalInputChange(e)}
                                        />
                                    </div>
                                <img 
                                    className="img-fluid" 
                                    src={templateData.imageUrl || null} 
                                    alt="主圖" />
                                </div>
                                <br/>
                                <div className="container">
                                    <div className="row row-cols-1 row-cols-2 md-2 g-4">
                                        {
                                            templateData.imagesUrl.map((url,index)=>{
                                                return (
                                                    <div className="row mt-2 ms-2" key={index}>
                                                        <label htmlFor="imageUrl" className="form-label">
                                                            輸入次要圖片網址
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={url}
                                                            onChange={(e)=>handleModalImageChange(index,e.target.value)}
                                                        />
                                                        {
                                                            url &&(
                                                                <img
                                                                    className="img-fluid"
                                                                    src={url || undefined}
                                                                    alt={`副圖${index + 1}`}
                                                                />
                                                            )
                                                        }
                                                        
                                                    </div>
                                                )
                                            })
                                            
                                        }   
                                    </div> 
                                </div>

                                <br/>
                                <div>
                                    <button className="btn btn-primary btn-sm d-block w-100"
                                    onClick={()=>handleAddImage()}>
                                        新增圖片
                                    </button>
                                </div>
                                <br/>

                                <div>
                                    <button className="btn btn-danger btn-sm d-block w-100"
                                    onClick={()=>handleRemoveImage()}>
                                        刪除圖片
                                    </button>
                                </div>
                            </div>

                            <div className="col-sm-8">
                                <div className="mb-3">
                                <label htmlFor="title" className="form-label">標題</label>
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="請輸入標題"
                                    value={templateData.title}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    />
                                </div>

                                <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="category" className="form-label">分類</label>
                                    <input
                                    name="category"
                                    id="category"
                                    type="text"
                                    className="form-control"
                                    placeholder="請輸入分類"
                                    value={templateData.category}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="unit" className="form-label">單位</label>
                                    <input
                                    name="unit"
                                    id="unit"
                                    type="text"
                                    className="form-control"
                                    placeholder="請輸入單位"
                                    value={templateData.unit}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    />
                                </div>
                                </div>

                                <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="origin_price" className="form-label">原價</label>
                                    <input
                                    name="origin_price"
                                    id="origin_price"
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="請輸入原價"
                                    value={templateData.origin_price}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="price" className="form-label">售價</label>
                                    <input
                                    name="price"
                                    id="price"
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder="請輸入售價"
                                    value={templateData.price}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    />
                                </div>
                                </div>
                                <hr />

                                <div className="mb-3">
                                <label htmlFor="description" className="form-label">產品描述</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="請輸入產品描述"
                                    value={templateData.description}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                <label htmlFor="content" className="form-label">說明內容</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    className="form-control"
                                    placeholder="請輸入說明內容"
                                    value={templateData.content}
                                    onChange={(e)=>handleModalInputChange(e)}
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="goings"> 使用難度 </label>
                                        <select name="難度" id="goings" className="form-select" value={templateData.goings}
                                        onChange={(e)=>handleGoingsChange(e)}>
                                            <option value="" selected disabled>請選擇難度</option>
                                            <option value="1" >1星</option>
                                            <option value="2">2星</option>
                                            <option value="3">3星</option>
                                            <option value="4">4星</option>
                                            <option value="5">5星</option>
                                        </select>
                                </div>

                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                        name="is_enabled"
                                        id="is_enabled"
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={templateData.is_enabled}
                                        onChange={(e)=>handleModalInputChange(e)}
                                        />
                                        <label className="form-check-label" htmlFor="is_enabled">
                                        是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => closeModal()}
                            >
                            取消
                            </button>
                            <button type="button" className="btn btn-primary"
                            onClick={()=>updateProduct(templateData.id)}>確認</button>
                        </div>
                        </>
                    )
                }

            </div>
        </div>
    </div>
    )
};


export default AddProduct;