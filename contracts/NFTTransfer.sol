//

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//Security Package to avoid continuous request of buying and selling
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTTransfer is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _itemTrans;

    address payable owner;
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Certificate {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        bool transferred;
    }

    mapping(uint256 => Certificate) private certificateIds;

    event CertificateItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        bool transferred
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createCertificate(address nftContract, uint256 tokenId)
        public
        payable
        nonReentrant
    {
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        certificateIds[itemId] = Certificate(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)), // When new NFT is created its ownership add is set to 0.
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit CertificateItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            false
        );
    }

    function transferCertificate(
        address nftContract,
        uint256 itemId,
        address applicantAdd
    ) public payable nonReentrant {
        uint256 tokenId = certificateIds[itemId].tokenId;

        IERC721(nftContract).transferFrom(address(this), applicantAdd, tokenId);

        certificateIds[itemId].owner = payable(applicantAdd);

        certificateIds[itemId].transferred = true;
        _itemTrans.increment();

        payable(owner).transfer(listingPrice);
    }

    //Returns the Certificates created
    function fetchCertificatesCreated() public view returns (Certificate[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateIds[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        Certificate[] memory items = new Certificate[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateIds[i + 1].seller == msg.sender) {
                uint256 currentId = certificateIds[i + 1].itemId;
                Certificate storage currentItem = certificateIds[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Certificates Left to Transfer
    function fetchCertificatesLeft()
        public
        view
        returns (Certificate[] memory)
    {
        uint256 itemCount = _itemIds.current();
        uint256 leftCertificate = _itemIds.current() - _itemTrans.current();

        uint256 currentIndex = 0;

        Certificate[] memory items = new Certificate[](leftCertificate);

        for (uint256 i = 0; i < itemCount; i++) {
            if (certificateIds[i + 1].owner == address(0)) {
                uint256 currentId = certificateIds[i + 1].itemId;
                Certificate storage currentItem = certificateIds[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Certificates Left to Transfer
    function fetchCertificatesTransferred()
        public
        view
        returns (Certificate[] memory)
    {
        uint256 itemCount = _itemIds.current();
        uint256 transCertificate = _itemTrans.current();

        uint256 currentIndex = 0;

        Certificate[] memory items = new Certificate[](transCertificate);

        for (uint256 i = 0; i < itemCount; i++) {
            if (certificateIds[i + 1].owner != address(0)) {
                uint256 currentId = certificateIds[i + 1].itemId;
                Certificate storage currentItem = certificateIds[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Returns certificates of the user
    function fetchMyCertificates() public view returns (Certificate[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateIds[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Certificate[] memory items = new Certificate[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (certificateIds[i + 1].owner == msg.sender) {
                uint256 currentId = certificateIds[i + 1].itemId;
                Certificate storage currentItem = certificateIds[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
