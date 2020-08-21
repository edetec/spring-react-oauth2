import { Button, FormControl, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import Alert from 'react-s-alert';
import React, { useState } from 'react';
import { savePerson } from '../util/APIUtils';

function CpfField(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

export default function PersonForm({ history }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        gender: '',
        email: '',
        dateOfBirth: '',
        naturalness: '',
        nationality: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handlerSubmit = event => {
        event.preventDefault();
        savePerson(values).then(
            () => {
                Alert.success("Person saved successfully.");
                history.goBack();
            }
        ).catch(
            err => {
                if(Array.isArray(err.errors)){
                    err.errors.forEach(error => {
                        Alert.error(error.defaultMessage);
                    });
                } else {
                    Alert.error(err.message);
                }
            }
        )
    }

    return (
        <div>
            <h2>Person</h2>
            <form onSubmit={(event) => handlerSubmit(event)}>
                <FormControl fullWidth className={classes.margin}>
                    <TextField label="Name"
                        value={values.name}
                        onChange={handleChange('name')}
                        required
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel id="gender-label">
                        Gender
                    </InputLabel>
                    <Select labelId="gender-label"
                        value={values.gender}
                        onChange={handleChange('gender')}
                    >
                        <MenuItem value="F">Female</MenuItem>
                        <MenuItem value="M">Male</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <TextField required
                        label="Date of Birth"
                        type="date"
                        value={values.dateOfBirth}
                        onChange={handleChange('dateOfBirth')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <TextField label="Email"
                        value={values.email}
                        onChange={handleChange('email')}
                        type="email"
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <TextField label="Naturalness"
                        value={values.naturalness}
                        onChange={handleChange('naturalness')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <TextField label="Nationality"
                        value={values.nationality}
                        onChange={handleChange('nationality')}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel id="cpf-label">
                        CPF
                    </InputLabel>
                    <Input required
                        value={values.cpf}
                        onChange={handleChange('cpf')}
                        inputComponent={CpfField}
                    />
                </FormControl>
                <div className={classes.buttons}>
                    <Button type="submit" color="primary" variant="contained">Save</Button>
                    <Button variant="contained" onClick={() => history.goBack()}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}