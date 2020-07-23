import React from "react";
import './library.css'

export const Library = () => {
    return (
        <div>
            <div className='image-size'>
                <div className='image-style'>
                    <div>
                        <img width={120} height={160} src={'https://i.loli.net/2019/04/10/5cada7e73d601.jpg'}/>
                    </div>
                    <div style={{textAlign:'center'}}>标题</div>
                    <div style={{textAlign:'center'}}>作者</div>
                </div>
            </div>
        </div>
    )
}
