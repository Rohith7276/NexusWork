// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriminalRecord {
    enum Role{Public, Officers}
    struct Record {
        uint256 id;
        string name;
        string crime;
        string location;
        string victim;
        string amount;
        string description;
        string category;
        string officer;
        string ipfsHash;
        uint256 timestamp;
        address addedBy;
        bool isActive;  //Case open or closed
    }
    mapping(address => Role) public users;
    modifier ForOfficers(){
        require(users[msg.sender] == Role.Officers, "For Investigating officers");
        _;
    }
    modifier ForPublic(){
        require(users[msg.sender] == Role.Public, "View-mode only");
        _;
    }
    function setRole(address user, Role role) public onlyOwner {
        users[user] = role;
    }
    mapping(uint256 => Record) public IDtorecords;
    mapping(string => uint256[]) public nameToRecordIds;
    uint256[] public recordIds;
    uint256 public recordCount;
    
    address public owner;
    
    
    event RecordAdded(
        uint256 indexed recordId,
        string name,
        string crime,
        address indexed addedBy,
        uint256 timestamp
    );
    
    event RecordUpdated(
        uint256 indexed recordId,
        address indexed updatedBy,
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    
    constructor() {
        owner = msg.sender;
        
    }
    
    function addRecord(
        string memory _name,
        string memory _crime,
        string memory _location,
        string memory _victim,
        string memory _amount,
        string memory _description,
        string memory _category,
        string memory _officer,
        string memory _ipfsHash
    ) public ForOfficers {
        recordCount++;
        uint256 newRecordId = recordCount;
        
        IDtorecords[newRecordId] = Record({
            id: newRecordId,
            name: _name,
            crime: _crime,
            location: _location,
            victim: _victim,
            amount: _amount,
            description: _description,
            category: _category,
            officer: _officer,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            addedBy: msg.sender,
            isActive: true
        });
        
        recordIds.push(newRecordId);
        nameToRecordIds[_name].push(newRecordId);
        
        emit RecordAdded(newRecordId, _name, _crime, msg.sender, block.timestamp);
    }
    
    function getRecord(uint256 _recordId) public view returns (
        uint256 id,
        string memory name,
        string memory crime,
        string memory location,
        string memory victim,
        string memory amount,
        string memory description,
        string memory category,
        string memory officer,
        string memory ipfsHash,
        uint256 timestamp,
        address addedBy,
        bool isActive
    ) {
        Record memory record = IDtorecords[_recordId];
        return (
            record.id,
            record.name,
            record.crime,
            record.location,
            record.victim,
            record.amount,
            record.description,
            record.category,
            record.officer,
            record.ipfsHash,
            record.timestamp,
            record.addedBy,
            record.isActive
        );
    }
    
    function searchRecordsByName(string memory _name) public view returns (uint256[] memory) {
        return nameToRecordIds[_name];
    }
    
    function getAllRecordIds() public view returns (uint256[] memory) {
        return recordIds;
    }
    
    function updateRecord(
        uint256 _recordId,
        string memory _name,
        string memory _crime,
        string memory _location,
        string memory _victim,
        string memory _amount,
        string memory _description,
        string memory _category,
        string memory _officer,
        string memory _ipfsHash
    ) public ForOfficers() {
        require(users[msg.sender] == Role.Officers, "For Investigating officers");
        require(IDtorecords[_recordId].id != 0, "Record does not exist");
        
        Record storage record = IDtorecords[_recordId];
        
        // Remove old name mapping
        uint256[] storage oldNameRecords = nameToRecordIds[record.name];
        for (uint i = 0; i < oldNameRecords.length; i++) {
            if (oldNameRecords[i] == _recordId) {
                oldNameRecords[i] = oldNameRecords[oldNameRecords.length - 1];
                oldNameRecords.pop();
                break;
            }
        }
        
        // Update record
        record.name = _name;
        record.crime = _crime;
        record.location = _location;
        record.victim = _victim;
        record.amount = _amount;
        record.description = _description;
        record.category = _category;
        record.officer = _officer;
        record.ipfsHash = _ipfsHash;
        
        // Add new name mapping
        nameToRecordIds[_name].push(_recordId);
        
        emit RecordUpdated(_recordId, msg.sender, block.timestamp);
    }
    
    function deactivateRecord(uint256 _recordId) public ForOfficers {
        require(users[msg.sender] == Role.Officers, "For Investigating officers");
        require(IDtorecords[_recordId].id != 0, "Record does not exist");
        IDtorecords[_recordId].isActive = false;
    }
    function reactivateRecord(uint256 _recordId) public ForOfficers {
        require(users[msg.sender] == Role.Officers, "For Investigating officers");
        require(IDtorecords[_recordId].id != 0, "Record does not exist");
        IDtorecords[_recordId].isActive = true;
    }
    
    function getRecordCount() public view returns (uint256) {
        return recordCount;
    }
}
