import React from 'react';
import { CropTableMaxMin } from './components/CropTableMaxMin';
import { CropTableAverage } from './components/CropTableAverage';
import '@mantine/core/styles.css';
import { Title } from '@mantine/core';

const App: React.FC = () => {
    return (
        <div style={{ padding: '20px'}}>
             <Title order={3}>Indian Agriculture Data Analysis</Title>
            <div style={{ display: 'flex', gap: '10px', marginTop : "0px" }}>
                <div style={{ flex: 1 , marginTop : "10px" }}>
                <Title order={5}  style={{ textAlign: 'center', marginTop : "10px", marginBottom : "15px"  }}>Crop Production Max/Min by Year</Title>
                    <CropTableMaxMin />
                </div>
                <div style={{ flex: 1  , marginTop : "10px"}}>
                <Title order={5}  style={{ textAlign: 'center', marginTop : "10px",  marginBottom : "15px"  }}>Average Yield and Cultivation Area by Crop</Title>
                    <CropTableAverage />
                </div>
            </div>
        </div>
    );
};

export default App;
