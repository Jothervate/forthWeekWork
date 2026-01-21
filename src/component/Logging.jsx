// 使用大括號匯入具名導出的變數
import { INITIAL_TEMPLATE_DATA } from '../App';

//已登入頁面
const Logging=({checkLogin,products,tempProduct,openModal})=>{

    //建置原始資料

    


    return (
        <>
                <div className="container signin">
                    <button
                        className="btn btn-danger mb-5"
                        type="button"
                        onClick={checkLogin}
                        >
                        確認是否登入
                    </button>
                    
                    <div className="container">
                        
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h2>產品列表</h2>
                            <div className="text-end mt-4">
                                <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => openModal("create",INITIAL_TEMPLATE_DATA)}>
                                建立新的產品
                                </button>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>分類</th>
                                    <th>產品名稱</th>
                                    <th>原價</th>
                                    <th>售價</th>
                                    <th>是否啟用</th>
                                    <th>編輯</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products && products.length > 0 ? (
                                    products.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.category}</td>
                                        <td>{item.title}</td>
                                        <td>{item.origin_price}</td>
                                        <td>{item.price}</td>
                                        <td className={`${item.is_enabled?"text-success":""}`}>
                                            {item.is_enabled ? "啟用" : "未啟用"}
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-pill" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-outline-primary btn-sm"
                                                onClick={()=>{openModal("edit",item)}}>編輯</button>
                                                <button type="button" className="btn btn-outline-danger  btn-sm"
                                                onClick={()=>{openModal('delete',item)}}>刪除</button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="5">尚無產品資料</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <h2>單一產品細節</h2>
                            {tempProduct ? (
                                <div className="card mb-3">
                                <img
                                    src={tempProduct.imageUrl || null}
                                    className="card-img-top primary-image"
                                    alt="主圖"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                    {tempProduct.title}
                                    <span className="badge bg-primary ms-2">
                                        {tempProduct.category}
                                    </span>
                                    </h5>
                                    <p className="card-text">
                                    商品描述：{tempProduct.description}
                                    </p>
                                    <p className="card-text">商品內容：{tempProduct.content}</p>
                                    <div className="d-flex">
                                    <p className="card-text text-secondary">
                                        <del>{tempProduct.origin_price}</del>
                                    </p>
                                    元 / {tempProduct.price} 元
                                    </div>
                                    <h5 className="mt-3">更多圖片：</h5>
                                    <div className="d-flex flex-wrap">
                                    {tempProduct.imagesUrl?.map((url, index) => (
                                        <img
                                        key={index}
                                        src={url || null}
                                        className="images"
                                        alt="副圖"
                                        />
                                    ))}
                                    </div>
                                </div>
                                </div>
                            ) : (
                                <p className="text-secondary">請選擇一個商品查看</p>
                            )}
                        </div>
                    </div>
                    </div>
                    
                    
                </div>
        </>
    )
};


export default Logging;