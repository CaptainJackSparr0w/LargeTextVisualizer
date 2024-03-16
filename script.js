const textArea = document.getElementById('textArea');
const button = document.getElementById('showText');
const div = document.getElementById('stage');

const spans = new Array();
let timer;
let index = 0;

button.addEventListener("click", ShowText);

async function ShowText()
{
    // console.log(textArea.value);
    if(textArea.value == '')
        textArea.value = "Whereas recognition of the inherent dignity";
    let postText = await getRedditPostText(textArea.value);
    // let post = getRedditPostText(textArea.value);
    if(postText != '' && postText != undefined)
        textArea.value = postText;
    const text = textArea.value;
    const arr = text.split(' ');
    div.innerHTML = '';
    spans.length = 0;

    console.log(arr.length);
    for(let i = 0; i < arr.length; i++)
    {
        const span = document.createElement("span");
        span.textContent = arr[i];
        span.className = "dimSpan";

        // if(i == 1)
        //     span.className = "highlightedSpan";

        div.appendChild(span);
        div.appendChild(document.createTextNode(" "));
        spans.push(span);
    }

    index = 0;
    if(timer)
        clearInterval(timer);

    timer = setInterval(CycleHighlight, 1000);
    
}

function CycleHighlight()
{
    if(index < spans.length)
    {
        spans[index].className = 'highlightedSpan';
        if(index > 0)
            spans[index-1].className = 'dimSpan';

        index++;
    }
    else
    {
        spans[index-1].className = 'dimSpan';
        index = 0;
    }
}

// Function to fetch Reddit post text from its URL
async function getRedditPostText(url) {
    try {
        // Make a GET request to the Reddit API
        const response = await fetch(url + '.json');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }
        
        // Parse the JSON response
        const postData = await response.json();
        
        // Extract the post text from the JSON response
        const postText = postData[0].data.children[0].data.selftext;
        
        // Return the post text
        return postText;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

