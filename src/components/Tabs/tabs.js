import React, {useState, useEffect, useCallback} from 'react';
import classes from './tabs.module.css';

const Tabs = ({ children, active = 0 }) => {
    const [activeTab, setActiveTab] = useState(active);
    const [tabsData, setTabsData] = useState([]);

    const setActiveTabIndex = useCallback((index) => {
        setActiveTab(index)
    }, [activeTab])

    useEffect(() => {
        let data = [];
        React.Children.forEach(children, element => {
            if (!React.isValidElement(element)) return;

            const {props: { title, children }} = element;
            data.push({title, children});
        })
        setTabsData(data)
    }, [children]);

  return (
    <div className={classes.tabsContainer}>
        <ul className={classes.tabs}>
            {
            tabsData.map(({ title }, index) => (
                <li className={`${classes.tab} ${index === activeTab && classes.activeTab}`} onClick={() => setActiveTabIndex(index)}>{ title }</li>
            ))}
        </ul>
        <div className={classes.textContainer}>
            {
                tabsData[activeTab] && tabsData[activeTab].children.map((item, index) => {
                    return !React.isValidElement(item) ? 
                    ( 
                        item.match(`\\b(${'title|Title'})\\b`, 'ig') ? 
                            (
                                <h1 className={classes.title} key={index}>{item.replace(/\b(?:title:|Title:)\b/gi, '')}</h1>
                            ) : 
                            ( 
                                <p className={classes.descriptionText} key={index}>{item}</p> 
                            )
                    ) : item
            })}
        </div>
    </div>
  )
}

const TabsChildren = ({children}) => {
    return {children}
}

Tabs.TabsChildren = TabsChildren;

export default Tabs