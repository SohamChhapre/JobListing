import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Background from './images/bg-header-desktop.svg';
import data_list from './data.json';
import icon_remove from './images/icon-remove.svg'
const App=() =>{
    const [data,setData]=useState([])
    const [tempdata,setTempdata]=useState([]);
    const [isfilter,setIsfilter]=useState(false);

  useEffect(()=>{
    // setData([])
    setTempdata(data_list)
    setIsfilter(false)
  },[])
  const check=(arr)=>{
    for(var k=0;k<data.length;k++)
    if(arr.indexOf(data[k])>-1)
       return true
    
    return false
  }
useEffect(()=>{
    if (data.length===0)
        {setIsfilter(false)
          setTempdata(data_list)
        }
    else{
    setIsfilter(true)
  
        }
  }
  ,
  [data,tempdata])
 
  
const FilterButton=({value})=>{
  let id=data.indexOf(value);
  return (
    <>
    <span type="button" className="btn-filter" >
      {value}<span className="cross-badge" onClick={(id)=>{
        let tdata=data;
        console.log(id,"<<<<<<<<<<<<<<<<<<<<<<<")
       
        // tdata=tdata[0,id]+tdata[id+1,tdata.length];
        setData(tdata.filter((e)=>(e !== value)))
         tdata=data_list;
         tdata=tdata.filter(function (i) {
          return data.includes(i.role)||
            data.includes(i.level)||
            (i.languages && check(i.languages)) ||
            (i.tools && check(i.tools))
            });
            setTempdata(tdata);
        console.log("filter",id);
      }}><img src={icon_remove} /></span>
    </span>
    </>

  )

}
const NewBagde=()=>{
 return (<>
 <small className="newbadge" style={{backgroundColor:'hsl(180, 29%, 50%)',color:"white",fontSize:'12px'}}>
 NEW!
 </small>
 </>)
}
const FeaturedBagde=()=>{
  return(<>
  <small className="newbadge" style={{backgroundColor:"hsl(180, 14%, 20%)",color:"white",fontSize:'12px'}}>
  FEATURED
  </small>
  </>
  )
}
const TechBadge=({value})=>{
  return (
    <>
    <small className='techbadge' onClick={()=>{
      if(!data.includes(value))
      {
        setData([...data,value])
        console.log("tech",value)
        console.log(data);
         let tdata=tempdata;
         tdata=tdata.filter(function (i) {
          return i.role===value||
            i.level===value||
            (i.languages && i.languages.includes(value)) ||
            (i.tools && i.tools.includes(value))
            });
            setTempdata(tdata);
        }
        }
    }>
     {/* style={{backgroundColor:"hsl(180, 31%, 95%)",color:"hsl(180, 29%, 50%)",borderRadius:"2px"}}> */}
    {value}</small>
    </>
  )
}  
const Row=({data:{id,logo,company,name,isnew,featured,position,role,level,postedAt,contract,location,languages,tools}})=>{
      
    return (

    <li className="table-row " style={{ borderLeft:isnew && featured? '4px solid hsl(180, 29%, 50%)':'none'}} >
      <div className=" col-1"><div className="mx-auto"><img src={require(`${logo}`)} className=" rounded-circle" width="50px" height="50px" style={{margin:"10px 8px"}} alt="User"/></div></div>
      <div className=" col-2" style={{paddingTop:"5px"}}>
      <small style={{color:"hsl(180, 29%, 50%)",fontWeight:"700"}}>{company}</small>
      {isnew && <NewBagde/>}{featured && <FeaturedBagde/>}<br/>
      <b style={{paddingTop:"12px",fontWeight:700}}>{position}</b><br/>
      
      <small style={{color:"darkslategray",margin:"auto"}}>{postedAt} <i className="fa fa-circle" style={{fontSize:"4px"}}></i>  {contract}   <i className="fa fa-circle" style={{fontSize:"4px"}}></i> {location}</small>
      </div>
      <hr className="sep-line"/>
      <div className=" col-3 col-3-container"   >
          {role &&  <TechBadge value={role}/>}
     {level &&  <TechBadge value={level}/>}    
      {languages && languages.length>0 && languages.map((e,i)=>(<TechBadge key={i} value={e}/>))}
      {tools && tools.length>0 && tools.map((e,i)=>(<TechBadge key={i} value={e}/>))}
      

      
      </div>
      </li>    
    )
}

const Table=()=>{
    return (
        <ul className="company-table ">
            
            {tempdata.map((e,i)=>(<Row key={i} data={e} />))}
  
        </ul>
    )
}
  return (
    <div className="App"  >
        <div  
       className="header">
        {/* <img src={Background} width="100%" height="100px"/> */}
          
        </div>
        
        <div className="outerlist" style={{background:"hsl(180, 52%, 96%)"}}>
         {isfilter && ( <div className="filter"> 
         <div className="filter-container">
         <div className="col-1">
           {data.length>0 && data.map((e,i)=>
           (<FilterButton value={e}  key={i}/>)

           ) 
               }
            </div>
          <div className="col-2 ">
          <div className="col-2-container">
         <a style={{color:" hsl(180, 8%, 52%)",textDecoration:"underline" ,padding:"0px 0px 2px 0px",cursor:"pointer"}} onClick={()=>{
           setData([])
         }}>clear</a>
         </div>
         </div>
         </div>
        
         </div> )
}
        <div style={{paddingTop:"80px",paddingBottom:"100px"}}>
        <Table/>
        </div>
        </div>
    <footer style={{backgroundColor:'whitesmoke',padding:"10px 10px 40px 10px",textAlign:"center"}}>
      <p style={{margin:"0 auto 0 auto"}}>Created by: Soham Chhapre $ <a href="mailto:1899sohamchhapre@gmail.com">
      <i class="fa fa-envelope-square" style={{fontSize:'26px'}}></i></a>
      <a href="https://www.github.com/SohamChhapre" target="_blank">
      <i class="fa fa-github" style={{fontSize:'26px',marginLeft:"10px"}}></i></a> $</p>
    </footer> 
    </div>
  );
}

export default App;
