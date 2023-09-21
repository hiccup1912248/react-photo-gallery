import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import arrayMove from "array-move";
import { DragDropContext } from 'react-beautiful-dnd'
import { photos } from "./mock-data";
import { exportAsImage, exportAsTxt } from "./export-file";
import SortableGallery from "./sortable-gallery";
import { Container, makeStyles, Grid, Paper, Button, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  paper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: "40vh",
    marginBottom: 20,
  },
}));

function App() {
  const [items, setItems] = useState(photos);
  const [myItems, setMyItems] = useState([]);
  const exportRef = useRef(null);

  const onDragEnd = (result) => {
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    if (destination.droppableId === source.droppableId) {
      if (destination.droppableId === 'myGallery') {
        setMyItems(arrayMove(myItems, source.index, destination.index));
      } else {
        setItems(arrayMove(items, source.index, destination.index));
      }
      return
    }
    // Moving from one list to another
    if (destination.droppableId === 'imageSet') {
      let start = myItems;
      let finish = items;
      let selected = start[source.index];
      start.splice(source.index, 1);
      finish.splice(destination.index, 0, selected);
      setItems(finish);
      setMyItems(start);
    } else {
      let start = items;
      let finish = myItems;
      let selected = start[source.index];
      start.splice(source.index, 1);
      finish.splice(destination.index, 0, selected);
      setItems(start);
      setMyItems(finish);
    }
    return
  }
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd} >
        <Grid container spacing={10} className={classes.boxContainer}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <SortableGallery items={items} droppableId={"imageSet"} index={0} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper} ref={exportRef}>
              <SortableGallery items={myItems} droppableId={"myGallery"} index={1} />
            </Paper>
            <Grid container direction="column" alignItems="center" justify="center">
              <Grid item xs={12} md={12} lg={12}>
                <Button variant="contained" color="primary" style={{ marginRight: 20 }} onClick={() => { exportAsTxt(myItems, "file names.txt") }}>Export file names</Button>
                <Button variant="contained" color="primary" onClick={() => { exportAsImage(exportRef.current, "merged image") }}>Export all in one image</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    </Container >
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
