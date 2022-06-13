import React, {useState, useCallback} from 'react';
import classes from './tabs.module.css';

const Tabs = ({ tabsData, active = 0 }) => {
    const [activeTab, setActiveTab] = useState(active);

    const setActiveTabIndex = useCallback((index) => {
        setActiveTab(index)
    }, [activeTab])

  return (
    <div className={classes.tabsContainer}>
        <ul className={classes.tabsList}>
            {
            tabsData.map((item, index) => (
                <li className={`${classes.tab} ${index === activeTab && classes.activeTab}`} onClick={() => setActiveTabIndex(index)}>{ item.tabTitle }</li>
            ))}
        </ul>
        <div className={classes.textContainer}>
            {tabsData[activeTab].content.map((ElementItem, index) => (
                    React.cloneElement(ElementItem, {key:`content-${index}`}) 
            ))}
        </div>
    </div>
  )
}

export default Tabs