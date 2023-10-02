import fs from "fs";
import path from "path";
import { ReadLine, createInterface } from "readline";
import mysqlPool from "../db/db";

export const readFile = (fileName: string) => {
  // const data = fs.readFileSync(path.join(__dirname,'../db/Tables.sql'),"utf-8").toString();
  // console.log(data);

  const readedQueries = fs.createReadStream(
    path.join(__dirname, `../db/${fileName}.sql`)
  );

  let rl = createInterface({
    input: readedQueries,
    terminal: false,
  });

  let queriesArray;

  rl.on("line", (chunk) => {
    queriesArray = chunk.split("\n");

    // for(let query of queriesArray){
    //     mysqlPool.query(query, (err, result, fields)=>{
    //         console.log(result);

    //         // if(result){
    //         //     console.log('todo guay');

    //         // }else{
    //         //     console.log('todo NO guay');

    //         // }
    //     })
    // }
  });

  rl.on("close", () => {
    console.log("finished");
  });

  console.log(queriesArray);

  return queriesArray;
};
