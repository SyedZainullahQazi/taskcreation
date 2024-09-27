import React from 'react';
import { Card } from 'antd'; // Import Ant Design Card

function AppLayout({ toolkit, children }) {
    return (
        <div>
            <div className='flex justify-center mt-20'>
                <Card
                    title="Your Card Title" // Set your card title here
                    extra={toolkit} // Render the toolkit in the card header
                    className='w-[80vw]'
                // Adjust style as needed
                >
                    {children} {/* Render children inside the Card */}
                </Card>
            </div>
        </div>

    );
}

export default AppLayout;
