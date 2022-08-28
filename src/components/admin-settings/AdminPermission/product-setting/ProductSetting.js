import React from 'react';
import Box from '@mui/joy/Box';
import ChipDelete from '@mui/joy/ChipDelete';
import Chip from '@mui/joy/Chip';
import { CssVarsProvider } from '@mui/joy/styles';
import './ProductSetting.css';

export const ProductSetting = ({ shoe, onDelete }) => {
    return (
        <div className='product-setting'>
            <div className='shoe-details'>
                <img className='shoe-img' src={shoe.media.smallImageUrl} alt='shoe' />
                <div className='shoe-name'>{shoe.shoe}</div>
                <div className='shoe-description'>{shoe.title}</div>
                <div className='shoe-price'>{`${shoe.retailPrice}$`}</div>
            </div>
            <CssVarsProvider>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                        variant="soft"
                        color="danger"
                        endDecorator={<ChipDelete variant="plain" onClick={() => onDelete(shoe)} />}
                    >
                        Delete
                    </Chip>
                </Box>
            </CssVarsProvider>
        </div>
    )
}
