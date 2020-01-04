import React, { Dispatch } from "react";
import MovieTable, { IMovieTableEvents } from "../../components/MovieTable";
import { connect } from "react-redux";
import { IRootstate } from "../../redux/reducers/RootReducer";
import MovieAction from "../../redux/actions/MovieAction";

function mapStateToProps(state: IRootstate) {
  return state.movie;
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(MovieAction.fetchMovies({
        page: 1,
        limit: 6,
        key: ""
      }))
    },
    onSwitchChange(type, newState, id) {
      dispatch(MovieAction.changeSwitch(type, newState, id))
    },
    async onDelete(id) {
      await dispatch(MovieAction.deleteMovie(id));
    },
    onChange(newPage) {
      dispatch(MovieAction.fetchMovies({
        page: newPage,
      }))
    },
    onKeyChange(key){
      dispatch(MovieAction.setConditionAction({
        key
      }))
    },
    onSearch(){
      dispatch(MovieAction.fetchMovies({
        page:1
      }))
    }
    
  }
  
}

const HOC = connect(mapStateToProps, mapDispatchToProps);
const MovieContanier = HOC(MovieTable);
export default class extends React.Component {
  render() {
    return (
      <MovieContanier />
    )
  }
}

// 仓库里面有数据，但没有界面

