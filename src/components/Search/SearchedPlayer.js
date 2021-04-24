import React from 'react';
import {
  useHistory
} from "react-router-dom"
import SnackbarContent from '@material-ui/core/SnackbarContent';

const SearchedPlayer = ({name, id}) => {
  const history = useHistory()

  return (
    <SnackbarContent key={id} message={name} onClick={() => history.push(`/player/${id}/`)}/>
  )
}

export default SearchedPlayer