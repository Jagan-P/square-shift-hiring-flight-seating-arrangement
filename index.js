/* ------------------- START OF INPUT TO THE PROGRAM ------------------------------------------------ */
exports.returnSeating = function (rowsColumnsSeats, numberOfPassengers) {
//   let rowsColumnsSeats = [
//     [3, 2],
//     [4, 3],
//     [2, 3],
//     [3, 4],
//   ];
  // let rowsColumnsSeats = [
  //     [3,4],
  //     [4,5],
  //     [2,3],
  //     [3,4]
  // ]
  // let numberOfPassengers = 30;
  /* ------------------- END OF INPUT TO THE PROGRAM --------------------------------------------------- */

  /* ------------------- START OF GLOBAL VARIABLES --------------------------------------------------- */
  let seatMap = [];
  let totalColumns = 0;
  let totalSeats = 0;
  let blockMap = [];
  let blockSeats = [];
  let columnsSeating = [];
  columnsSeating[0] = rowsColumnsSeats[0][0];
  let maxRows = 0;
  let maxColumns = 0;
  /* ------------------- END OF GLOBAL VARIABLES --------------------------------------------------- */

  /* ------------------- START OF GLOBAL FUNCTIONS --------------------------------------------------- */
  function initMap(maxRows, maxColumns, blocks) {
    let map = [];
    for (let block = 0; block < blocks; block++) {
      map.push([]);
      for (let column = 0; column < maxColumns; column++) {
        for (let row = 0; row < maxRows; row++) {
          map[block].push(0);
        }
      }
    }
    return map;
  }

  function fillSeat(seat_type) {
    let row = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let currentRow = {};
    for (k = 0; k < maxColumns; k++) {
      for (i = 0; i < rowsColumnsSeats.length; i++) {
        for (j = 0; j < rowsColumnsSeats[i][0]; j++) {
          if (typeof blockMap[i][j + k + (currentRow[i] || 0)] == "object") {
            if (
              blockMap[i][j + k + (currentRow[i] || 0)].seat_type ==
                seat_type &&
              blockMap[i][j + k + (currentRow[i] || 0)].is_occupied == 0
            ) {
              filledPassenger++;
              blockMap[i][j + k + (currentRow[i] || 0)].is_occupied = 1;
              blockMap[i][j + k + (currentRow[i] || 0)].is_occupied_by =
                filledPassenger;
              return;
            }
          }
        }
        if (isNaN(currentRow[i])) {
          currentRow[i] = j - 1;
        } else {
          currentRow[i] = currentRow[i] + (j - 1);
        }
      }
    }
  }
  /* ------------------- END OF GLOBAL FUNCTIONS --------------------------------------------------- */

  for (let [blockIndex, rowColumn] of rowsColumnsSeats.entries()) {
    totalColumns += rowColumn[0];
    totalSeats += rowColumn[0] * rowColumn[1];
    blockSeats.push(rowColumn[0] * rowColumn[1]);
    blockMap[blockIndex] = [];
    if (blockIndex > 0) {
      columnsSeating.push(rowColumn[0] + columnsSeating[blockIndex - 1]);
    }
    if (maxColumns < rowColumn[0]) {
      maxColumns = rowColumn[0];
    }
    if (maxRows < rowColumn[1]) {
      maxRows = rowColumn[1];
    }
  }
  blockMap = initMap(maxRows, maxColumns, rowsColumnsSeats.length);

  for (let [blockIndex, blockSeat] of blockSeats.entries()) {
    for (let seat = 0; seat < blockSeat; seat++) {
      let availableColumns = rowsColumnsSeats[blockIndex][0];
      let leftMost = blockIndex == 0;
      let noWindowSeat = !(leftMost || blockIndex == blockSeats.length - 1);
      let rightMost = blockIndex == blockSeats.length - 1;
      if (leftMost && (seat == 0 || seat % availableColumns == 0)) {
        blockMap[blockIndex][seat] = { seat_type: "w", is_occupied: 0 };
      } else if (leftMost && seat % availableColumns == 2) {
        blockMap[blockIndex][seat] = { seat_type: "a", is_occupied: 0 };
      } else if (leftMost) {
        blockMap[blockIndex][seat] = { seat_type: "c", is_occupied: 0 };
      } else if (
        noWindowSeat &&
        (seat == 0 ||
          seat % availableColumns == 0 ||
          seat % availableColumns == availableColumns - 1)
      ) {
        blockMap[blockIndex][seat] = { seat_type: "a", is_occupied: 0 };
      } else if (noWindowSeat) {
        blockMap[blockIndex][seat] = { seat_type: "c", is_occupied: 0 };
      } else if (rightMost && seat % availableColumns == availableColumns - 1) {
        blockMap[blockIndex][seat] = { seat_type: "w", is_occupied: 0 };
      } else if (rightMost && seat % availableColumns == 0) {
        blockMap[blockIndex][seat] = { seat_type: "a", is_occupied: 0 };
      } else if (rightMost) {
        blockMap[blockIndex][seat] = { seat_type: "c", is_occupied: 0 };
      } else {
        throw new Error("Something went wrong");
      }
    }
  }

  let filledPassenger = 0;
  for (let passenger = 0; passenger < numberOfPassengers; passenger++) {
    if (filledPassenger < numberOfPassengers) {
      fillSeat("a");
    }
  }
  for (let passenger = 0; passenger < numberOfPassengers; passenger++) {
    if (filledPassenger < numberOfPassengers) {
      fillSeat("w");
    }
  }
  for (let passenger = 0; passenger < numberOfPassengers; passenger++) {
    if (filledPassenger < numberOfPassengers) {
      fillSeat("c");
    }
  }
  return (blockMap);
};
