import {FC, useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

export interface ITab {
    id : string | number;
    value : string;
}

export interface ITabsProps {
    tabs : ITab[];
    maxNumberOfTabsToDisplay? : number;
    tabChangeHandler? : (currentTab : ITab) => void;
}

export const TabGroup : FC<ITabsProps> = (props : ITabsProps) => {
    const [selectedTab, setSelectedTab] = useState<ITab>();

    const onTabClick = (tab : ITab) => {
        setSelectedTab(tab);

        if (props.tabChangeHandler !== undefined)
            props.tabChangeHandler(tab);
    };

    const maxNumberOfTabs : number = props.maxNumberOfTabsToDisplay ?? 3;
    const hasDropdown = props.tabs.length > maxNumberOfTabs;
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

    const mappedPaneTabs = props.tabs.slice(0, maxNumberOfTabs).map((tab: ITab) => {
       return <li key={tab.id} className={"nav-item"} style={{cursor: 'pointer'}} onClick={() => onTabClick(tab)}>
           <div className={`nav-link ${selectedTab?.id === tab.id || (selectedTab === undefined && props.tabs[0] === tab) ? 'active' : ''}`}>
               {tab.value}
           </div>
       </li>;
    });

    const mappedDropdownTabs = props.tabs.slice(maxNumberOfTabs).map((tab : ITab) => {
        return <DropdownItem key={tab.id} onClick={() => onTabClick(tab)}>
            {tab.value}
        </DropdownItem>;
    });

    return (
        <ul className="nav nav-tabs">
            {mappedPaneTabs}
            {hasDropdown && (
               <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} direction={"down"}>
                   <DropdownToggle caret outline color={"primary"} className={"ms-2"}>
                       More
                   </DropdownToggle>

                   <DropdownMenu>
                       {mappedDropdownTabs}
                   </DropdownMenu>
               </Dropdown>
            )}
        </ul>
    );
}