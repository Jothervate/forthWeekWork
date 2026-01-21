//分頁模板

const Pagination=({pagination ,onChangePage})=>{

    // 切換頁數
    const changePage=(e,page)=>{
        e.preventDefault();
        onChangePage(Number(page))
    }

    return(
        <>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center my-4">
                <ul className="pagination">
                    {/* {確認是否有上一頁?是,可選取:否,不可選取} */}
                    <li className={`page-item ${!pagination.has_pre&& "disabled"}`}>
                        <a className="page-link" href="#" aria-label="Previous"
                        onClick={(e)=>changePage(e, pagination.current_page-1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {/* 使用Array.from功能來插入合計頁碼 */}
                    {
                        Array.from({length: pagination.total_pages},(_,i)=>{
                            const pageNum=i+1
                            return (
                                    <li className={`page-item ${pagination.current_page === i+1 && "active"}`} key={`${i}_page`}>
                                        <a 
                                            className="page-link" 
                                            onClick={(e)=>changePage(e,pageNum)} 
                                            style={{cursor:"pointer"}}>{pageNum}</a>
                                    </li>
                            )
                        })
                    }

                    {/* {同上方確認是否有上一頁邏輯} */}
                    <li className={`page-item ${!pagination.has_next&& "disabled"}`}>
                        <a className="page-link" href="#" aria-label="Next"
                        onClick={(e)=>changePage(e, pagination.current_page+1)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
};



export default Pagination;