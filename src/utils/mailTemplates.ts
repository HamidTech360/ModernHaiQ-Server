export function CreateHaikuMailTemplate (link:any){
    return (
        `
                <div style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
                <h2>You published your HAIQ</h2>
                <p>Here is the link to your haiq ${link}</p>
            </div>
        `
    )
}

export function HaikuReceiptMailTemplate (link:String|null=null){
    return (
        `
        <div style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;padding-left: 20px;padding-right: 20px;">
            <h1>Memorialization Receipt</h1>
            <p>Hi there</p>
            <p>Here is your receipt from Modern HAIQ</p>
            <p>Purchase of Authorship and Memorialization. You can view through this link ${link}</p>
            <h2>Total: $100</h2>
        </div>
        `
    )
}