/**
- Record := Time, Location, Traffic, ToDo, WearMask, Comment, [] Contacts
- Contact := Name, Relationship,  WearMask, Gender, Tel, Organization
**/
//
const {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  Container,
  CssBaseline,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Collapse,
  Icon,
  Checkbox,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Grid,
  Link,
  Divider,
  Dialog,DialogTitle,MuiDialogTitle,TextField,
  FormControlLabel,DialogContent,DialogActions,
  FormControl,InputLabel,Select,MenuItem,FormLabel,
  RadioGroup,Radio,InputAdornment,clsx
} = MaterialUI;

const theme = responsiveFontSizes(createMuiTheme({
  palette:{
    primary: MaterialUI.colors.blue,
  }
}));

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  iconhot: {
    color: '#f82',
  },
  iconcold: {
    color: '#6cf',
  },
  form:{
    padding: theme.spacing(3)
  },
  textfield:{
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    flexGrow: 1,
  },
}));


function JumpAlert(){
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            行程记录本
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h6" color="inherit" style={{marginLeft:theme.spacing(2)}}>
            请使用浏览器打开。<br/>
            点击右上角的...按钮，选择浏览器打开。
          </Typography>
        </Container>
      </main>
    </React.Fragment>
  );
}

function UserGuide(props){
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    localStorage['visited']='true';
    onClose();
  };
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          用户须知
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            本应用旨在平时记录行程轨迹与接触人员，为快速流调提供辅助信息。
          </Typography>
          <Typography gutterBottom>
            为严格保护个人隐私信息，所有数据均保存在浏览器的本地存储内，不出用户终端设备，不上网传输。因此如有浏览器开启隐身模式、退出清空缓存、清空浏览器数据等操作，均可导致本应用记录信息丢失。
          </Typography>
          <Typography gutterBottom>
            同时，本应用所有数据无备份，删除即不可恢复。需要提供流调信息时，请点击右上角“导出”按钮，已填信息将被导出为csv文件。
          </Typography>
          <Typography gutterBottom>
          本程序开源，前端代码未经压缩混淆，可自行开展安全审计。源代码见  https://github.com/babyline838/TrajectoryNote  。
          </Typography>
          <Typography gutterBottom>
            感谢大家配合，让我们共同抗疫，胜利属于东川路800号！
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// function TimePicker(props){
//   const [startDate, setStartDate] = React.useState(new Date());
//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       timeInputLabel=":"
//       dateFormat="MM/dd/yyyy hh:mm"
//       showTimeInput
//     />
//   );
// }

function ContactRow(props){
  const classes = useStyles();
  const handleChange = (event) => {
    let newinfo=props.info;
    if(event.target.id=="time_start"){
      newinfo[event.target.id]=event.target.value;
      newinfo.time_end=event.target.value;
    } else {
      if(event.target.id){
        newinfo[event.target.id]=event.target.value;
      }
      else{
        newinfo[event.target.name]=event.target.value;
        if(event.target.name=='with_mask')
          newinfo[event.target.name] = newinfo[event.target.name]=='true'
      }
    }
    props.updatedata(newinfo);
  };
  return (
    <Grid container spacing={1} style={{marginLeft:theme.spacing(1)}}>
    <Grid item xs={4} sm={4} md={4}>
      <TextField
        id="name"
        label="姓名"
        value={props.info.name}
        margin="dense"
        onChange={handleChange}
    /></Grid>

    <Grid item xs={6} sm={6} md={6} style={{alignSelf:'flex-end',marginTop:theme.spacing(1)}}>
      <div>
      <FormControl component="fieldset" style={{flexDirection:'row'}}>
        <FormLabel component="legend" style={{paddingRight:theme.spacing(2)}}>对方已戴口罩</FormLabel>
        <RadioGroup row name="with_mask" id="with_mask" value={props.info.with_mask} onChange={handleChange}>
          <FormControlLabel name="with_mask" value={true} control={<Radio />} label="是" />
          <FormControlLabel name="with_mask" value={false} control={<Radio />} label="否" />
        </RadioGroup>
      </FormControl>
      </div>
    </Grid>

    <Grid item xs={1} sm={1} md={1} style={{marginLeft:"-1.6em"}}>
      <IconButton color="primary" onClick={()=>{props.handleDeleteContact();}}>
        <Icon style={{fontSize:'1.2em'}}>delete</Icon>
      </IconButton>
    </Grid>

    <Grid item xs={4} sm={4} md={4}>
      <TextField
        id="contact_time"
        label="接触时长"
        type='number'
        value={props.info.contact_time}
        className={classes.textField}
        InputProps={{startAdornment:(<InputAdornment position="start" style={{marginRight:0}}/>),endAdornment:(<InputAdornment position="end">分钟</InputAdornment>)}}
        onChange={handleChange}
    /></Grid>
    <Grid item xs={5} sm={5} md={5} style={{alignSelf: 'center'}}>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel>接触距离</InputLabel>
        <Select
          label="接触距离"
          id="contact_distance"
          name="contact_distance"
          value={props.info.contact_distance}
          onChange={handleChange}
        >
          <MenuItem name="contact_distance" value={1}>小于1米</MenuItem>
          <MenuItem name="contact_distance" value={2}>1~2米</MenuItem>
          <MenuItem name="contact_distance" value={3}>大于2米</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    {/**
    <Grid item xs={6} sm={4} md={3}>
      <TextField
        id="telphone"
        label="电话号码"
        value={props.info.telphone}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    **/}
    <Grid item xs={9} sm={9} md={9}>
      <TextField
        fullWidth
        id="organization"
        label="学院/单位"
        value={props.info.organization}
        margin="dense"
        onChange={handleChange}
    /></Grid>
    </Grid>
  );
}

function AddDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  const [info,setinfo]=React.useState({
    id:next_record_id,
    time_start:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
    time_end:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
    location:"",
    traffic:"无",
    todo:"",
    with_mask:false,
    comment:"",
  })
  let [contacts,setcontacts]=React.useState([{
    name:"",
    relation:"",
    with_mask:false,
    contact_time:null,
    contact_distance:"",
    organization:"",
  }]);

  const handleSubmit = ()=>{
    let data=info;
    data.close_contacts=contacts;
    let valid=true;
    // Validation
    // console.log(data);
    // window.var_data=data;
    if(valid){
      data.id=info.id;
      props.updatecallback(data);
      setinfo({
        id:next_record_id,
        time_start:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
        time_end:dateFormat('YYYY-mm-ddTHH:MM',new Date()),
        location:"",
        traffic:"无",
        todo:"",
        with_mask:false,
        comment:"",
      });
      setcontacts([{
        name:"",
        relation:"",
        with_mask:false,
        contact_time:null,
        contact_distance:"",
        organization:"",
      }]);
      onClose();
    } else {
      // set err
    }
  };
  const handleAddContact = ()=>{
    setcontacts([...contacts,{
      name:"",
      relation:"",
      with_mask:false,
      contact_time:null,
      contact_distance:"",
      organization:"",
    }]);
  };

  const handleDeleteContactFactory = (idx)=>{
    return ()=>{
      setcontacts(contacts.filter((e,i)=>i!=idx));
    };
  };
  const updatecontacts = (idx)=>{
    return (item)=>{
      setcontacts(contacts.map((e,i)=>i==idx?item:e));
    }
  }
  const handleChange = (event) =>{
    let newinfo=info;
    if(event.target.id=="time_start"){
      newinfo[event.target.id]=event.target.value;
      newinfo.time_end=event.target.value;
    } else {
      if(event.target.id){
        newinfo[event.target.id]=event.target.value;
      }
      else{
        newinfo[event.target.name]=event.target.value;
        if(event.target.name=='with_mask')
          newinfo[event.target.name] = newinfo[event.target.name]=='true'
      }
    }
    setinfo({...newinfo});
  };
  return (
    <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        添加记录
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
        ) : null}
      </DialogTitle>
      <form className={classes.form} noValidate autoComplete="off" style={{textAlign:'center'}}>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_start} onChange={handleChange} name="time_start" id="time_start" label="开始时间"/>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_end} onChange={handleChange} name="time_end" id="time_end" label="结束时间"/>
        <TextField fullWidth required className={classes.textfield} value={info.location} onChange={handleChange} name="location" id="location" helperText="在某地 或 从某地到某地" label="地点" />
        <TextField fullWidth required className={classes.textfield} value={info.traffic} onChange={handleChange} name="traffic" id="traffic" label="交通方式" />
        <TextField fullWidth required className={classes.textfield} value={info.todo} onChange={handleChange} name="todo" id="todo" label="做什么事" />
        <FormControl component="fieldset" style={{flexDirection:'row'}}>
          <FormLabel component="p" style={{marginRight:theme.spacing(2)}}>已戴口罩</FormLabel>
          <RadioGroup row name="with_mask" id="with_mask" value={info.with_mask} onChange={handleChange}>
            <FormControlLabel name="with_mask" value={true} control={<Radio />} label="是" />
            <FormControlLabel name="with_mask" value={false} control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>
        <TextField fullWidth className={classes.textfield} value={info.comment} onChange={handleChange} name="comment" id="comment" label="备注" />

        <List>
          <Grid container spacing={4}>
            {
              contacts?.map((contact,idx) => (
              <Grid item key={idx} xs={12} sm={12} md={12} style={{marginTop:'15px'}}>
              <Paper elevation={4}>
                <ContactRow info={contact} setinfo={updatecontacts(idx)} idx={idx} handleDeleteContact={handleDeleteContactFactory(idx)} updatedata={updatecontacts(idx)}/>
              </Paper></Grid>))
            }
          </Grid>
        </List>
        <Button size="large" variant="contained" color="primary" disableRipple onClick={handleAddContact} style={{marginTop:'15px',marginRight:'40px'}}>添加接触者</Button>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{marginTop:'15px'}}>确认</Button>
      </form>
    </Dialog>
  );
}

function EditDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  let info=props.defaultinfo;
  const updatedata=props.updatedata;

  let contacts=props.defaultinfo.close_contacts;

  const [need_update,setupdate]=React.useState(false);
  const handleSubmit = ()=>{
    let data=info;
    let valid=true;
    // Validation
    // console.log(data);
    // window.var_data=data;
    if(valid){
      data.id=info.id;
      props.updatecallback(data);
      onClose();
    } else {
      // set err
    }
  };
  const handleAddContact = ()=>{
    let newcontacts=[...contacts,{
      name:"",
      relation:"",
      with_mask:false,
      contact_time:null,
      contact_distance:"",
      organization:"",
    }];
    setcontacts(newcontacts);
  };
  const setcontacts = (list)=>{
    updatedata({...info,close_contacts:list});
  };

  const handleDeleteContactFactory = (idx)=>{
    return ()=>{
      // contacts.splice(idx,1);
      let newcontacts=contacts.filter((e,i)=>i!=idx)
      // updatedata({...info,clo});
      setcontacts(newcontacts);
    };
  };
  const updatecontacts = (idx)=>{
    return (item)=>{
      setcontacts(contacts.map((e,i)=>i==idx?item:e));
    }
  }
  const handleChange = (event) =>{
    let newinfo=info;
    if(event.target.id=="time_start"){
      newinfo[event.target.id]=event.target.value;
      newinfo.time_end=event.target.value;
    } else {
      if(event.target.id){
        newinfo[event.target.id]=event.target.value;
      }
      else{
        newinfo[event.target.name]=event.target.value;
        if(event.target.name=='with_mask')
          newinfo[event.target.name] = newinfo[event.target.name]=='true'
      }
    }
    updatedata(newinfo);
  };
  return (
    <Dialog maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        编辑记录
        {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
        ) : null}
      </DialogTitle>
      <form className={classes.form} noValidate autoComplete="off" style={{textAlign:'center'}}>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_start} onChange={handleChange} name="time_start" id="time_start" label="开始时间"/>
        <TextField fullWidth required type="datetime-local" className={classes.textfield} value={info.time_end} onChange={handleChange} name="time_end" id="time_end" label="结束时间"/>
        <TextField fullWidth required className={classes.textfield} value={info.location} onChange={handleChange} name="location" id="location" label="地点" />
        <TextField fullWidth required className={classes.textfield} value={info.traffic} onChange={handleChange} name="traffic" id="traffic" label="交通方式" />
        <TextField fullWidth required className={classes.textfield} value={info.todo} onChange={handleChange} name="todo" id="todo" label="做什么事" />
        <FormControl component="fieldset" style={{flexDirection:'row'}}>
          <FormLabel component="p" style={{marginRight:theme.spacing(2)}}>已戴口罩</FormLabel>
          <RadioGroup row name="with_mask" id="with_mask" value={info.with_mask} onChange={handleChange}>
            <FormControlLabel name="with_mask" value={true} control={<Radio />} label="是" />
            <FormControlLabel name="with_mask" value={false} control={<Radio />} label="否" />
          </RadioGroup>
        </FormControl>
        <TextField fullWidth className={classes.textfield} value={info.comment} onChange={handleChange} name="comment" id="comment" label="备注" />

        <List>
          <Grid container spacing={4}>
            {
              contacts?.map((contact,idx) => (
              <Grid item key={idx} xs={12} sm={12} md={12} style={{marginTop:'15px'}}>
              <Paper elevation={4}>
                <ContactRow info={contact} setinfo={(data)=>setcontacts(data)} idx={idx} handleDeleteContact={handleDeleteContactFactory(idx)} updatedata={updatecontacts(idx)}/>
              </Paper></Grid>))
            }
          </Grid>
        </List>
        <Button size="large" variant="contained" color="primary" disableRipple onClick={handleAddContact} style={{marginTop:'15px',marginRight:'40px'}}>添加接触者</Button>
        <Button size="large" variant="contained" color="primary" onClick={handleSubmit} style={{marginTop:'15px'}}>确认</Button>
      </form>
    </Dialog>
  );
}

function show_time(timestr){
  // const date=new Date(timestamp);
  // return date.toLocaleString();
  return timestr.replace('T','  ');
}

function ContactDisplayItem(props){
  const info=props.info;
  const classes=useStyles();
  return
}

function RecordItem(props) {
  const info=props.info;
  const handleClickEdit=props.editcallback;
  const handleClickDelete=props.deletecallback;
  const classes=useStyles();
  return (
  <Grid item xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div display='inline-flex'>
          <Typography variant="h5" className='h2' style={{display:"inline-flex"}}>
            {info.location}
          </Typography>
          <IconButton aria-label="edit" color="primary" size='small' onClick={handleClickEdit} style={{display:"inline-flex",float:"right"}}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton aria-label="edit" color="primary" size='small' onClick={handleClickDelete} style={{display:"inline-flex",float:"right",marginRight:theme.spacing(3), }}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
        <div>
          {
            (info.time_start==info.time_end)?
              (<Typography variant="body1">
                时间: {show_time(info.time_start)}
              </Typography>)
            :(<React.Fragment>
              <Typography variant="body1">
                开始时间: {show_time(info.time_start)}
              </Typography>
              <Typography variant="body1">
                结束时间: {show_time(info.time_end)}
              </Typography>
              </React.Fragment>)
          }

          <Typography variant="body1">
            地点: {info.location}
          </Typography>
          <Typography variant="body1">
            交通方式: {info.traffic}
          </Typography>
          <Typography variant="body1">
            做什么事: {info.todo}
          </Typography>
          <Typography variant="body1">
            是否戴口罩: {info.with_mask?"是":"否"}
          </Typography>
          <Typography variant="body1">
            备注: {info.comment}
          </Typography>
          <Divider />
          <List dense={true}>
            {
              info.close_contacts.map((contact,idx)=>(
                <React.Fragment key={idx}>
                <ListItem>
                  <ListItemText primary={contact.name + "  " + (contact.with_mask?"":"未") +" 戴口罩"} style={{color: contact.with_mask?'black':'red'}}/>
                </ListItem>
                <Divider />
                </React.Fragment>
              ))
            }
          </List>
        </div>
      </CardContent>
    </Card>
  </Grid>);
}

function Album(props) {
  // const [init,setinit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openGuide, setOpenGuide] = React.useState(!props.visited);
  const [editinfo, setEditinfo] = React.useState({});
  const [recorddata, setrecorddata_impl] = React.useState(props.data);
  // if(!init){
  //   setrecorddata_impl(props.data);
  //   setinit(true);
  // }

  const setrecorddata = (item)=>{
    localStorage['contact_info']=JSON.stringify(item);
    setrecorddata_impl(item);
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const append_data = (item) => {
    setrecorddata([...recorddata,JSON.parse(JSON.stringify(item))]);
    next_record_id+=1;
  };

  const set_data = (list) => {
    setrecorddata_impl(list);
  };

  const modify_data = (item) => {
    setEditinfo(item);
    let data=[];
    for(let i=0;i<recorddata.length;++i){
      if(item.id==recorddata[i].id){
        data.push(item);
      } else {
        data.push(recorddata[i]);
      }
    }
    setrecorddata_impl([...data]);
  };

  const modify_data_save = (item) => {
    let data=[];
    for(let i=0;i<recorddata.length;++i){
      if(item.id==recorddata[i].id){
        data.push(item);
      } else {
        data.push(recorddata[i]);
      }
    }
    setrecorddata(data);
  };

  const handleClickEdit = (info) => {
    setEditinfo(info);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickDelete = (id)=>{
    // setOpenAlert(true);
    let ret=confirm("确认删除？");
    if(ret)
      setrecorddata(recorddata.filter((e,i)=>e.id!=id));
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            行程记录本
          </Typography>
          <Button color="inherit" onClick={()=>openGuide?null:setOpenGuide(true)}><Icon>help_outline</Icon></Button>
          <Button color="inherit" onClick={export_records}><Icon>get_app</Icon>导出</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item key={-1} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent} style={{minHeight:100,textAlign:'center'}}>
                  <Typography gutterBottom variant="h4" component="h2">
                    新建记录
                  </Typography>
                  <IconButton color="primary" onClick={handleClickAdd} >
                    <Icon style={{fontSize:'3em'}}>add_circle_outline</Icon>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
            {recorddata.slice().reverse().map((info) => (<RecordItem info={info} key={info.id} editcallback={()=>handleClickEdit({...info})} deletecallback={()=>handleClickDelete(info.id)}/>))}
          </Grid>
        </Container>
      </main>
      <AddDialog open={openAdd} onClose={handleCloseAdd} updatecallback={append_data}/>
      <EditDialog open={openEdit} onClose={handleCloseEdit} updatecallback={modify_data_save} updatedata={modify_data} setdata={set_data} defaultinfo={editinfo} />
      <UserGuide open={openGuide} onClose={handleCloseGuide}/>
    </React.Fragment>
  );
}

function export_records_json(){
  let data=localStorage['contact_info'];
  let uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
  let link=document.createElement("a");
  link.href=uri;
  link.download="行程记录.json";
  link.click();
  document.body.removeChild(link);
}

function export_records(){
  let data=JSON.parse(localStorage['contact_info']);
  var max_close_contacts_length = 1;

  data.forEach( (item) => {
      if (item.close_contacts.length > max_close_contacts_length) max_close_contacts_length = item.close_contacts.length;
      item.time_start=item.time_start.replace('T',' ');
      item.time_end=item.time_end.replace('T',' ');
      item.with_mask=item.with_mask?"是":"否";
      item.id+=1;
      item.close_contacts.forEach(contact=>{
        delete contact.relation;
        contact.with_mask=contact.with_mask?"是":"否";
        contact.contact_distance={1:"小于1米",2:"1至2米",3:"大于2米"}[contact.contact_distance];
        contact.contact_time=String(contact.contact_time)+"分钟";
      })
  })
  const headers = [
      "编号",
      "开始时间",
      "结束时间",
      "地点",
      "交通工具",
      "做什么事",
      "是否戴口罩",
      "备注"
  ]

  for (let i = 0; i < max_close_contacts_length; i++) {
      headers.push("密接"+(i+1)+"姓名")
      headers.push("密接"+(i+1)+"是否带口罩")
      headers.push("密接"+(i+1)+"接触时间")
      headers.push("密接"+(i+1)+"接触距离")
      headers.push("密接"+(i+1)+"单位")
      // headers.push("密接"+i+"电话")
  }

  function convertToCSV(objArray) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';

      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','
              var element = array[i][index]
              if (Array.isArray(element)) {
                  let close_contacts_length = element.length;
                  for (var j =0 ; j < close_contacts_length; j++){
                      for (var subindex in element[j]){
                          var subelement = element[j][subindex]
                          if ( typeof subelement =='string') subelement = subelement.replace(/,/g, '，')
                          line += subelement + ",";
                      }
                  }
                  for (var j = close_contacts_length ; j < max_close_contacts_length; j++){
                      for (var k=0 ; k < 6; k++){
                          line += ",";
                      }
                  }
              }else{
                  if ( typeof element =='string') element = element.replace(/,/g, '，')
                  line += element;
              }
          }

          str += line + '\r\n';
      }

      return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
      if (headers) {
          items.unshift(headers);
      }

      // Convert Object to JSON
      var jsonObject = JSON.stringify(items);

      var csv = convertToCSV(jsonObject);

      var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
      csv = '\uFEFF' + csv;
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", exportedFilenmae);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }

  exportCSVFile(headers, data, '行程记录'); // call the exportCSVFile() function to process the JSON and trigger the download
}

let visited=JSON.parse(localStorage['visited']??"false");
let data=JSON.parse(localStorage['contact_info']??"[]");
// let data=[
//   {
//     id:5,
//     time_start:1647311997610,
//     time_end:
//     location:"第四餐饮大楼2楼",
//     traffic:"无",
//     todo:"早餐",
//     with_mask:true,
//     comment:"鸡蛋",
//     close_contacts:[
//       {
//         name:"打饭阿姨",
//         relation:"",
//         with_mask:false,
//         gender:"女",
//         telphone:"11101011010",
//         organization:"餐饮服务部",
//       },
//       {
//         name:"打饭大叔",
//         relation:"",
//         with_mask:true,
//         gender:"男",
//         telphone:"11101011010",
//         organization:"餐饮服务部",
//       }
//     ]
//   }
// ]
let next_record_id=data.length==0?0:(Math.max(...(data.map(e=>e.id)))+1);

let ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i)=="micromessenger") {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <JumpAlert/>
    </ThemeProvider>,
   document.querySelector('#container')
  )
} else {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Album data={data} visited={visited}/>
    </ThemeProvider>,
   document.querySelector('#container')
  )
}
