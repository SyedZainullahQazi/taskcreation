import React from 'react';
import { Badge, Card } from 'antd'; // Import Ant Design Card

function AppLayout({ title ,toolkit, children }) {
    return (
        <div>
            <div className='flex justify-center mt-20'>
            <Badge.Ribbon text="TASKS" style={{color:'white',backgroundColor:'orange'}}>

                <Card
                    title={title}// Set your card title here
                    extra={toolkit} // Render the toolkit in the card header
                    className='w-[80vw] h-[80vh]'
                // Adjust style as needed
                >
                    {children} {/* Render children inside the Card */}
                </Card>
              </Badge.Ribbon>
            </div>
        </div>

    );
}

export default AppLayout;
