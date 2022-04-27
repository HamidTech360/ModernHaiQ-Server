export function CreateHaikuMailTemplate (link:any){
    return (
        `
                <div style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">
                <h2>You published your Haik</h2>
                <p>Here is the link to your haiq ${link}</p>
            </div>
        `
    )
}