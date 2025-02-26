import { width } from "@mui/system"
import { Box, Collapse, Typography, IconButton } from "@mui/material"
import { DataGrid, GridRow, GridToolbar } from "@mui/x-data-grid"
import { Add, Delete, Edit } from "@mui/icons-material"
import RenderImage from "../../components/RenderImage"

const ExpandableRow = ({row, props, onEditClick, onDeleteClick}) => {
    let columns = []
    if (row.children && row.children.length > 0 ){
        columns = Object.keys(row.children[0]).map(key=>({
            field:key,
            headerName:key.charAt(0).toUpperCase()+key.slice(1).replaceAll("_", " "),
            width:150
        })).filter((item)=>item.field!=='children').filter((item)=>item.field!=='image')
        columns.push({field:'image', headerName:'Image', width:150, sortable:false, renderCell:(params)=>{
            <RenderImage data={params.row.image} name={params.row.name}/>
        }})
        columns = [{field:'action', headerName:'Action', width:180, sortable:false, renderCell:(params)=>{
            return(
                <>
                    <IconButton onClick={()=>onEditClick(params)}>
                        <Edit color="primary"/>
                    </IconButton>
                    <IconButton onClick={()=>onDeleteClick(params)}>
                        <Delete color="secondary"/>
                    </IconButton>
                </>
            )
        }}, ...columns]
    }
    return(
        <>
            <Box sx={{display:'flex', alignItems:'center'}}>
                <GridRow {...props}/>
            </Box>
            <Collapse in={row?.open?row.open:false} timeout={'auto'} unmountOnExit>
                <Box margin={1}>
                    {
                        row.children && row.children.length > 0 ?
                        <DataGrid 
                        rows={row.children}
                        columns={columns}
                        hideFooter
                        rowHeight={75}
                        rowSelection={false}
                        slots={{
                            toolbar:GridToolbar
                        }}
                        />
                        :(
                            <Typography variant="body2" align="center" textAlign={"center"}>No children items</Typography>
                        )
                    }
                </Box>
            </Collapse>
        </>
    )
}

export default ExpandableRow