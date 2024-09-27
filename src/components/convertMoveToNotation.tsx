
const pieceSymbols: { [key: string]: string } = {
    p: '',   // Quân tốt trắng
    r: '♖',  // Xe trắng
    n: '♘',  // Mã trắng
    b: '♗',  // Tượng trắng
    q: '♕',  // Hậu trắng
    k: '♔',  // Vua trắng
    P: '',   // Quân tốt đen
    R: '♜',  // Xe đen
    N: '♞',  // Mã đen
    B: '♝',  // Tượng đen
    Q: '♛',  // Hậu đen
    K: '♚',  // Vua đen
  };
  
  function convertMoveToNotation(move: any): string {
    console.log("Converting move object:", JSON.stringify(move, null, 2));
    
    if (typeof move === 'string') {
      console.log("Move is already a string notation:", move);
      return move;
    }
  
    if (!move || !move.piece || !move.from || !move.to) {
      console.error("Invalid move object:", move);
      return "";
    }
  
    const from = move.from;
    const to = move.to;
    const piece = move.piece;
    const captured = move.captured;
    const promotion = move.promotion;
    const check = move.san && move.san.includes('+');
    const checkmate = move.san && move.san.includes('#');
    const flags = move.flags || '';
  
    let notation = '';

    if (pieceSymbols[piece] === undefined) {
      console.error("Piece symbol is undefined for piece:", piece);
      return "";
    }
  
    // Xử lý nhập thành (castling)
    if (flags.includes('k')) {
      return 'O-O'; // Nhập thành gần
    }
    if (flags.includes('q')) {
      return 'O-O-O'; // Nhập thành xa
    }
  
    // Thêm ký hiệu quân cờ (nếu không phải quân tốt)
    if (pieceSymbols[piece] === undefined) {
      console.error("Piece symbol is undefined for piece:", piece);
      return ""; // Trả về chuỗi rỗng nếu không xác định được ký hiệu quân cờ
    }
    
    notation += pieceSymbols[piece] || '';
  
    // Xử lý nước bắt quân (capture)
    if (captured) {
      if (piece === 'p' || piece === 'P') {
        // Nếu quân tốt bắt quân, cần thêm ký hiệu cột của ô từ
        notation += from[0]; // Lấy ký hiệu cột
      }
      notation += 'x'; // Ký hiệu bắt quân
    }
  
    // Thêm vị trí ô đến
    notation +=  to;
  
    // Xử lý thăng cấp (promotion)
    if (promotion) {
      notation += '=' + pieceSymbols[promotion];
    }
  
    // Xử lý nước chiếu hoặc chiếu bí
    if (checkmate) {
      notation += '#';  // Chiếu bí
    } else if (check) {
      notation += '+';  // Chiếu tướng
    }
  
    console.log("Final Notation: ", notation);  // Ghi log kết quả cuối cùng của nước đi
    return notation;
  }
  
  
  export default convertMoveToNotation;
  