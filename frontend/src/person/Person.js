import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { getPersons } from '../util/APIUtils';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function Person({ history }) {
    const classes = useStyles();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getPersons().then(list => {
            setPersons(list)
        })
    }, [])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Natualness</TableCell>
                            <TableCell align="right">Nationality</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell scope="row">{person.name}</TableCell>
                                <TableCell align="right">{person.gender}</TableCell>
                                <TableCell align="right">{person.email}</TableCell>
                                <TableCell align="right">{person.naturalness}</TableCell>
                                <TableCell align="right">{person.nationality}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Fab
                style={{ float: 'right' }}
                onClick={() => history.push('person/new')}
                size="small"
                color="primary"
                aria-label="add"
                className={classes.margin}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}
