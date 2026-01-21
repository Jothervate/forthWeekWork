//尚未登入頁面內容
const Not_log= ({onSubmit,handleInputChange,formData})=>{

    

    return(
        <div className="container login"> 
                    <h1 className="mt-5">請先登入</h1>
                    <form className="form-floating form-signin"
                        onSubmit={(e)=>onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="Email1" className="form-label">電子信箱</label>
                                <input 
                                    type="email"
                                    name="username" 
                                    value={formData.username} 
                                    onChange={(e)=>handleInputChange(e)}    
                                    placeholder="Email" 
                                    className="form-control" 
                                    id="Email1" 
                                    aria-describedby="emailHelp" />

                                <div id="emailHelp" className="form-text">此Email為非公開,我們不會將該email分享給其他人</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">密碼</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={formData.password} 
                                    onChange={(e)=>handleInputChange(e)}
                                    placeholder="password" 
                                    className="form-control" 
                                    id="Password" />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="CheckBox"/>
                                <label className="form-check-label" htmlFor="CheckBox">記住我</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-2">提交</button>
                    </form>
                </div> 
    )
};


export default Not_log