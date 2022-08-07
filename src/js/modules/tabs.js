function tabs(tabsSelector, tabsContentSelector, tabsParentSelctor, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelctor);

    function hideTabContent(content, item){
        content.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        item.forEach(element =>{
            element.classList.remove(activeClass);
        });
    }

    function showTabContent(content, item, i = 0){
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');
        item[i].classList.add(activeClass);
    }

    hideTabContent(tabsContent, tabs);
    showTabContent(tabsContent, tabs);

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((element, i) =>{
                if(element == target){
                    hideTabContent(tabsContent, tabs);
                    showTabContent(tabsContent, tabs, i); 
                }
            });
        }
    });
}

export default tabs;