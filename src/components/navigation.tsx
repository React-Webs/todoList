import React from 'react';
import {Box, Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

function Navigation(props : any) {
    return (
        <Box component={'div'} className={'navigation'} >
            <Button variant={'outlined'} className={'navigationBox'}>
                <Typography variant={'subtitle1'} color={'black'} >
                    ALL
                </Typography>
            </Button>
            <hr />
            <Button variant={'outlined'} className={'navigationBox'}>
                <Typography variant={'subtitle1'} color={'black'} >
                    DONE
                </Typography>
            </Button>
        </Box>
    );
}

export default Navigation;